/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './table-style.css';
import './paginate-style.css';
export default function DBPaginate() {
    let [data, setData] = React.useState('')
    let [page, setPage] = React.useState([])

    React.useEffect(() => {
        //อ่าน Query String ที่ปรากฎบน URL ของบราวเซอร์ในขณะนั้น
        let qStr = window.location.search
        let params = new URLSearchParams(qStr)

        //นำส่วน Query String ไปต่อท้าย URL เป้าหมายของฝั่งเซิร์ฟเวอร์
        fetch('/api/db/paginate?' + params)
            .then(response => response.json())
            .then(result => {
                if (result.totalDocs > 0) { //หากมีข้อมูลผลลัพธ์
                    showData(result.docs) //แสดงรายการข้อมูล
                    showPages(result) //แสดงหมายเลขเพจ
                } else {
                    setData(<>ไม่มีราการข้อมูล</>)
                }
            })
        .catch(err => alert(err))
    }, [])

    //ฟังก์ชันสำหรับแสดงรายการข้อมูล แล้วเปลี่ยนค่าใน State
    const showData = (result) => {
        let tb = (
            <table>
                <tr>
                    <th className="thLeft">ชื่อสินค้า</th><th>ราคา</th>
                    <th>วันที่เพิ่มสินค้า</th><th className="thLeft">รายละเอียด</th>
                </tr>
                {
                    result.map(doc => {
                        //จ้ดรูปแบบวันเดือนปี ที่สามารถเข้าใจได้
                        let dt = new Date(Date.parse(doc.date_added))
                        let df = (
                            <>{dt.getDate()}-{dt.getMonth()+1}-{dt.getFullYear()}</>
                        )
                        let p = new Intl.NumberFormat().format(doc.price)

                        return (
                            <tr>
                                <td>{doc.name}</td>
                                <td className="tdCenter">{p}</td>
                                <td className="tdCenter">{df}</td>
                                <td>{doc.detail}</td>
                            </tr>
                        )
                    })
                }
            </table>
        )
        setData(tb)
    }
    //ฟังก์ชันสำหรับสร้างหมายเลขเพจ แล้วเปลี่ยนค่าใน State
    const showPages = (result) => {
        let links = [] //เพื่อความสะดวกควร เราจะเก็บลิงก์ของแต่ละเพจไว้ในอาร์เรย์
        //วนลูปตามจำนวนหมายเลขเพจที่แบ่งได้
        for (let i = 1; i <= result.totalPages; i++){
            if (i === result.page) { //เพจปัจจุบันไม่ทำลิงก์
                links.push(<span className="page-active">{i}</span>)
            } else {
                //กำหนดลิงก์ของเพจ โดยกำหนดหมายเลขในแบบ Query String
                //วางต่อท้าย URL ของฝั่งโลคอลหรือคอมโพเนนต์นั่นเอง
                let a = (
                    <a href={'/db/paginate?page=' + i} className="page">{i}</a>
                )
                links.push(a)
            }
        }
        setPage(links) //เปลี่ยนค่าใน State
    }
    return (
        <div style={{margin:'20px'}}>
            <div id="data">{data}</div><br />
            <div>{page.map(p => <>{p}</>)}</div><br />
            <a href="/db">หน้าหลัก</a>
        </div>
    )
}