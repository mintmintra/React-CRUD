import React from 'react'
import DBCreate from './db-create'
import DBRead from './db-read'
import DBUpdate from './db-update'
import DBDelete from './db-delete'
import DBPaginate from './db-paginate'
import DBSearch from './db-search'
import './nav.css'

export default function DBNav() {
    const path = window.location.pathname
    switch (path) {
        case '/db':
            return (
                <section className="navbar">
                    <div className="logo">
                        <h1>My Logo</h1>
                    </div>
                    <ul>
                    <li><a href="/db/create">เพิ่มข้อมูล</a></li>
                    <li><a href="/db/read">แสดงข้อมูล</a></li>
                    <li><a href="/db/update">เเก้ไขข้อมูล</a></li>
                    <li><a href="/db/delete">ลบข้อมูล</a></li>
                    <li><a href="/db/paginate">แบ่งเพจ</a></li>
                    <li><a href="/db/search">Workshop: ค้นหาข้อมูล</a></li>
                </ul>
                </section>
            )
        case '/db/create': return <DBCreate />
        case '/db/read': return <DBRead />
        case '/db/update': return <DBUpdate />
        case '/db/delete': return <DBDelete />
        case '/db/paginate': return <DBPaginate />
        case '/db/search': return <DBSearch />
        default: window.location.href = '/db'
    }
}
