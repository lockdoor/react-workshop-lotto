import { useEffect, useState } from "react"
import NumberFromTable from "./NumberFromTable"
import { Link } from 'react-router-dom'


export default function ListCustomer({customerArr}){
  
  const [customerSort, setCustomerSort] = useState([])
  
  const sortBy = (e) => { 
    // console.log(e.target.value)     
    setCustomerSort(prev => {
      const arr = [...prev]
      
      if(e.target.value === 'unPaid'){
        console.log(e.target.value)   
        arr.sort((a,b)=> b.unPaid - a.unPaid)
      }else if(e.target.value === 'dontPaid'){
        console.log(e.target.value)   
        arr.sort((a,b)=> b.dontPaid - a.dontPaid)
      }else{
        console.log(e.target.value)   
        arr.sort((a,b)=> {
          if(a.customer.name < b.customer.name){return -1}
          else if(a.customer.name > b.customer.name){return 1}
          else{return 0}
        })
      }
      console.log(arr)
    return arr
    })      

    
    
  }

  useEffect(()=>{
    //เรียงลำดับตามคนที่มีการค้างจ่ายมากที่สุด
    // console.log(customerArr)    
    //ทำการเพิ่ม dontPaid และ price เข้าไปใน customer
    const customers = customerArr.map((customer) => {
      let count = 0
      let unPaid = 0
      customer.tableOfCustomer.forEach((table) => {
        table.numbers.forEach((number) => {
          if(number.reserve && number.paid === false){
            count++
            unPaid += parseInt(table.price)
          }
        })  
      })
      customer.dontPaid = count
      customer.unPaid = unPaid
      return customer
    })

    customers.sort((a,b)=>{
      return b.unPaid - a.unPaid
    })

    setCustomerSort(customers)
    // console.log(customers)
    
  }, [customerArr])

  return(
    <div style={{width: '100%'}}>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <label style={{style: 'inline-block'}}>เรียงลำดับ: 
        <select onChange={sortBy}>
          <option value="unPaid">ยอดค้างจ่าย</option>
          <option value="dontPaid">จำนวนเลข</option>
          <option value="alphabet">ตัวอักษร</option>
        </select>
        </label>
      </div>
      {customerSort.map(customer => (
        <div key={customer.customer.name}
          style={{
            width: '100%',
            // border: '1px solid red',
            // height: 50,
            backgroundColor: '#1f8eba',
            color: 'white',
            margin: "15px 0",
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center",
            borderRadius: 5,
            boxShadow: '2px 2px 5px black'
          }}         
        >
          <Link to={`./${customer.customer.id}-${customer.customer.name.replace(" ", "")}`} style={{
            flex: 2,
            padding: '0 5px',
            textDecoration: 'none',
            color: 'white'
          }}>{customer.customer.name}</Link>
          
          <div style={{
            flex: 7,
            display: 'flex',
            flexDirection: 'column',
            padding: '5px 0'
          }}>{customer.tableOfCustomer.map((table, index)=>{
              return(
                <span key={`${table.tableId}${table.tableName}`}
                  style={{
                    display: 'flex',
                    padding: '5px 0',
                    borderBottom: index+1 !== customer.tableOfCustomer.length 
                      ? '1px solid white' : 'none'
                }}>
                  <Link to={`../../table/${table.tableId}-${table.tableName.replace(" ", "")}`} 
                    style={{
                      flex: 1,
                      textDecoration: 'none',
                      color: 'white'
                    }}>{table.tableName}</Link>
                  <span style={{flex: 3}}>{table.numbers.map(number => (<NumberFromTable number={number} key={number.num}/>))}</span>
                  
                </span>
              )
                   
          })}</div>

          <div style={{flex: 2, textAlign: 'end', paddingRight: 10}}>
            ฿ {customer.unPaid}
          </div>

        </div>
      ))}
    </div>
  )
}
