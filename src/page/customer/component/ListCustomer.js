import { useEffect, useState } from "react"
import NumberFromTable from "./NumberFromTable"

export default function ListCustomer({customerArr}){
  
  const [customerSortByNumber, setCustomerSortByNumber] = useState([])
  useEffect(()=>{
    //เรียงลำดับตามคนที่มีการค้างจ่ายมากที่สุด
    // console.log(customerArr) 
    
    //ทำการเพิ่ม dontPaid และ price เข้าไปใน customer
    const customers = customerArr.map((customer) => {
      let count = 0
      let price = 0
      customer.tableOfCustomer.forEach((table) => {
        table.numbers.forEach((number) => {
          if(number.reserve && number.paid === false){
            count++
            price += parseInt(table.price)
          }
        })  
      })
      customer.dontPaid = count
      customer.price = price
      return customer
    })

    customers.sort((a,b)=>{
      return b.dontPaid - a.dontPaid
    })
    setCustomerSortByNumber(customers)
    console.log(customers)
    
  }, [customerArr])
  return(
    <div style={{width: '100%'}}>
      {customerSortByNumber.map(customer => (
        <div key={customer.customer.name}
          style={{
            width: '100%',
            border: '1px solid red',
            // height: 50,
            margin: "15px 0",
            display: 'flex',
            flexDirection: 'row',
            alignItems: "center"
          }}         
        >
          <div style={{
            flex: 2,
            padding: '0 5px'
          }}>{customer.customer.name}</div>
          
          <div style={{
            flex: 7,
            display: 'flex',
            flexDirection: 'column'
          }}>{customer.tableOfCustomer.map(table=>{
            // if(table.numbers.length !== 0){
              return(
                <span key={`${table.tableId}${table.tableName}`}
                  style={{
                    display: 'flex',
                }}>
                  <span style={{flex: 1}}>{table.tableName}</span>
                  <span style={{flex: 3}}>{table.numbers.map(number => (<NumberFromTable number={number} key={number.num}/>))}</span>
                  {/* <span style={{flex: 1}}>ราคา</span> */}
                </span>
              )
            // }else{
            //   return <></>
            // }          
          })}</div>

          <div style={{flex: 2, textAlign: 'end', paddingRight: 10}}>
            ฿ {customer.price}
          </div>

        </div>
      ))}
    </div>
  )
}
