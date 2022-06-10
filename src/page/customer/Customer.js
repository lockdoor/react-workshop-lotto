import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ModalChangeText from "../../component/ModalChangeText"
import { setCustomerName } from "../../redux/reducer"

export default function Customer(){
  const { tables, customers } = useSelector((state) => state.reducer)
  const dispatch = useDispatch()
  const {params} = useParams()
  const customerId = parseInt(params.split("-")[0]) 
  
  const [tableOfCustomer , setTableOfCustomer] = useState([])
  const [showModalChangeText, setShowModalChangeText] = useState(false)
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

  

  const findCustomerName = (customerId) => {
    const customer =  customers.find(customer => customer.id === customerId)
    return customer.name
  }
  
  useEffect(()=>{
    const arr = tables.filter((table)=>{
      // console.log(table)
      const tableHasCustomer = table.numbers.filter(number => number.customer === customerId)
      // console.log(tableHasCustomer)
      return tableHasCustomer.length === 0 ? false : true
    }).map(table => {
      
      const numbers = table.numbers.filter((number)=> number.reserve && number.customer === customerId) 
      // console.log(numbers)
      let unPaid = 0
      numbers.forEach(number => {
        if(number.reserve && !number.paid){
          unPaid += parseInt(table.price)
        }
      });
      const thisTable = {...table} 
      thisTable.numbers = numbers
      thisTable.unPaid = unPaid
      return thisTable
    })
    arr.sort((a,b)=>{
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    // console.log(arr)
    setTableOfCustomer(arr)
    // console.log(tableOfCustomer)
  }, [tables, customerId])
  

  return (
    <div style={{
      width: '95%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* <h1>{params}</h1> */}

      <ModalChangeText 
        onOpen={showModalChangeText}
        onClose={()=>setShowModalChangeText(false)}
        header="เปลี่ยนชื่อลูกค้า"
        content={findCustomerName(customerId)}
        onSave={(text)=>dispatch(setCustomerName({id: customerId, name: text}))}
      />
      <h2 onClick={()=>setShowModalChangeText(true)}
        style={{cursor: 'pointer'}}>{findCustomerName(customerId)} </h2>
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
              <Link to={`../../tables/${table.id}-${table.name.replace(" ", "")}`}
                style={{
                  flex: 1,
                  padding: '0 5px',
                  textDecoration: 'none',
                  color: 'white'
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