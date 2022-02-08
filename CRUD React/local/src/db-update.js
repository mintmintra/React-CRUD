/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import './table-style.css';
export default function DBUpdate() {
    let [data, setData] = React.useState('')
    const form = React.useRef()
    const name = React.useRef()
    const price = React.useRef()
    const date_added = React.useRef()
    const detail = React.useRef()

    React.useEffect(() => {
        fetch('/api/db/read') //อ่านข้อมูลมาแสดงผล
        .then(response => response.json())
        .then(result => {
            if(result.length > 0){
                showData(result)
            }else{
                setData(<>ไม่มีรายการข้อมูล</>)
            }
        })
        .catch(err => alert(err))
    }, [])

    const showData = (result) => {
        let r = (
            <form onSubmit={onSubmitForm} ref={form}>
                <table id="tableUpdate">
                    <tr>
                        <th>แก้ไข</th><th className="thLeft">ชื่อสินค้า</th><th>ราคา</th><th>วันที่เพิ่มสินค้า</th><th className="thLeft">รายละเอียดสินค้า</th>
                    </tr>
                    {
                        result.map(doc => {
                            let dt = new Date(Date.parse(doc.date_added))
                            let dmy = (
                                <>{dt.getDate()}-{dt.getMonth()+1}-{dt.getFullYear()}</>
                            )
                            let p = new Intl.NumberFormat().format(doc.price)

                            return(
                                <tr>
                                {/*
                                    เมื่อคลิก radio บนรายการใด เราก็แนบ document ของรายการนั้น ไปยังฟังก์ชันเป้าหมาย เพื่อใช้ในการอ่านข้อมูลจากแต่ละฟิลด์ไปแสดงที่ฟอร์ม
                                */}
                                    <td class="tdCenter">
                                        <input type="radio" name="_id" value={doc._id}
                                        onClick={() => onClickRadio(doc)}
                                        />
                                    </td>
                                    <td>{doc.name}</td>
                                    <td className="tdCenter">{p}</td>
                                    <td className="tdCenter">{dmy}</td>
                                    <td>{doc.detail}</td>
                                </tr>
                            )
                        })
                    }
                    {/* สร้างฟอร์มไว้ที่แถวสุดท้าย */}
                    <tr style={{backgroundColor: 'lightgray'}}>
                        <td><button>แก้ไข</button></td>
                        <td><input type="text" name="name" ref={name} /></td>
                        <td><input type="number" name="price" ref={price} /></td>
                        <td>
                            <input type="date" name="date_added" ref={date_added} />
                        </td>
                        <td>
                            <textarea name="detail" cols="34" rows="3" ref={detail}>
                            </textarea>
                        </td>
                    </tr>
                </table>
                <div>เลือกรายการที่จะแก้ไข แล้วใส่ข้อมูลใหม่ลงไป จากนั้นคลิกปุ่ม แก้ไข</div>
            </form>
        )
        setData(r)
    }

    const onSubmitForm = (event) => {
        event.preventDefault()

        if(!window.confirm('ยืนยันการแก้ไขรายการนี้')){
            return
        }

        const fd = new FormData(form.current)
        const fe = Object.fromEntries(fd.entries())

        fetch('/api/db/update', {
            method: 'POST',
            body: JSON.stringify(fe),
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => response.json())
        .then(result => {
            if(result.error) {
                alert(result.error)
            } else {
                //หลังการแก้ไข ฝั่งเซิร์ฟเวอร์จะอ่านข้อมูลใหม่ แล้วส่งกลับมา
                //เราก็นำมาแสดงผลใหม่อีกครั้ง
                showData(result)
                form.current.reset()
                alert('ข้อมูลถูกแก้ไขแล้ว')
            }
        })
        .catch(err => alert(err))
    }
    //เมื่อ radio บนรายการใดถูกคลิก ในที่นี้ใช้ click แทน change
    //ก็อ่านข้อมูลในแต่ละฟิลต์จาก document ที่ผ่านเข้ามา แล้วเติมลงในฟอร์ม

    const onClickRadio = (doc) => {
        name.current.value = doc.name
        price.current.value = doc.price

        let dt = new Date(Date.parse(doc.date_added))
        let y = dt.getFullYear()
        let m = dt.getMonth() + 1

        m = (m >= 10) ? m : '0' + m
        let d = dt.getDate()
        d = (d >= 10) ? d : '0' + d
        date_added.current.value = `${(y)}-${m}-${d}`
        detail.current.value = doc.detail
    }
    return(
        <div style={{margin:'20px'}}>
            <div id="data">{data}</div><br/>
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}