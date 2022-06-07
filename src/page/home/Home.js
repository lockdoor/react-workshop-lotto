// import { useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import ReportCard from './component/ReportCard'
import './Home.css'

/*
  จะทำหน้านี้เป็น dashboard
  แสดงชื่อตารางที่เปิดอยู่
  แสดงวันที่งวด
  แสดงราคา
  แสดงยอดจองของแต่ละตาราง
  แสดงยอดจ่ายของแต่ละตาราง
  แสดงยอดค้างของแต่ละตาราง
  แสดงยอดเหลือแต่ละตาราง
  ทำการฟ์วงกลมแสดงยอดจอง จ่าย ค้าง เหลือ  
*/

export default function Home() {
  const {tables} = useSelector((state) => state.reducer)  
  
  const tableOn = tables.filter(table => table.settings.tableOn)
// console.log(tableOn)
  return (
    <div className='home-container'>
      <div className='home-logo-container'>
        <img className='home-logo'
          src={require('../../assets/logo.svg').default} alt="logo" />
      </div>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
      }}>
        {tableOn.map((el) => (
          <ReportCard table={el}
            key={`${el.id}-${el.name}`} />
          )
        )}
      </div>
      
    </div>
  )
}