import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Customer(){
  const { tables } = useSelector((state) => state.reducer)
  const {params} = useParams()
  const customerName = params.split("-")[1]
  // console.log(customerName)
  const [tableOfCustomer , setTableOfCustomer] = useState([])

  /*
    ต้องการแสดงรายละเอียดของลูกค้า
    - แต่ละตาราง เรียงตามจำนวนเงินที่ยังไม่ได้จ่าย    
    - จำนวนเลขที่ซื้อทั้งหมดในทุกตาราง
    - จำนวนเงินที่จ่ายแล้วทั้งหมด
    - แสดงเลขที่ซื้อบ่อย 10 อันดับแรก
    
    การตั้งค่า
    - สามารถเปลี่ยนชื่อลูกค้าได้
  */

  const totalUnPaid = () => {
    let unPaid = 0
    tableOfCustomer.forEach((table)=>{
      unPaid += table.unPaid
    })
    return unPaid
  }
  
  useEffect(()=>{
    const arr = tables.filter((table)=>{
      const tableHasCustomer = table.numbers.filter(number => number.customer === customerName)
      return tableHasCustomer.length === 0 ? false : true
    }).map(table => {
      const numbers = table.numbers.filter((number)=> number.reserve && number.customer === customerName) 
      let unPaid = 0
      table.numbers.forEach(number => {
        if(number.reserve && !number.paid){
          unPaid += parseInt(table.price)
        }
      });
      const thisTable = {...table} 
      thisTable.numbers = numbers
      thisTable.unPaid = unPaid
      return thisTable
    })
    // console.log(arr)
    setTableOfCustomer(arr)
    // console.log(tableOfCustomer)
  }, [tables, customerName])
  

  return (
    <div style={{
      width: '95%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* <h1>{params}</h1> */}
      <h2>{customerName}</h2>
      <div>ยอดค้างจ่าย {totalUnPaid()}</div>
      <div style={{width: '100%'}}>
        {tableOfCustomer.map(table => {
          return (
            <div key={`${table.id}${table.name}`}
              style={{
                backgroundColor: table.settings.tableOn ? '#1f8eba' : '#ccc',
                color: 'white',
                margin: "15px 0",
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                borderRadius: 5,
                boxShadow: '2px 2px 5px black',
                padding: '20px 10px'
              }}
            >
              <Link to={`../../table/${table.id}-${table.name.replace(" ", "")}`}
                style={{
                  flex: 1,
                  padding: '0 5px'
              }}>{table.name}</Link>
              
              <div style={{
                flex: 3,
                padding: '0 5px'}}
              >{table.numbers.map((number)=>{
                return (
                  <label key={number.num}>
                    <input 
                      type="checkbox" readOnly 
                      checked={number.paid ? 'checked' : ''}
                    />{number.num}
                  </label>
                )
              })}</div>
              <div>{table.unPaid}</div>
            </div>
          )
        })}
      </div>
    </div>
    
  )
}