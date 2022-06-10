import { useSelector } from "react-redux"
import ListCustomer from "./component/ListCustomer"

export default function Customers(){

  /*
    ต้องการดูว่าลูกค้าซื้อแล้วกี่เบอร์ ยังไม่ได้จ่ายกี่เบอร์ ยังไม่ได้จ่ายเป็นเงินเท่าไร
      เรียงลับดับตามจำนวนเบอร์ที่ยังไม่ได้จ่าย
      สามารถเพิ่มรายละเอียดของลูกค้า เช่น เบอร์โทร เลขบัญชี lineId
      สามารถแก้ไขชื่อลูกค้าได้
      สามารถตั้งค่าอิโมจิของลูกค้าได้
    เมื่อคลิกไปที่ลูกค้าจะเข้าไปรายละเอียดลูกค้าในแต่ละตาราง
      เรียงตามลำดับวันที่ของตาราง
      แสดงเบอร์ที่ซื้อทั้งหมด ทำสัญลักษณ์ว่าเลขไหนจ่ายหรือไม่จ่าย
      แสดงจำนวนเงินแต่ละตารางที่ต้องจ่าย
      สามารถกดจ่ายเงินได้ทีละเลข และทั้งหมด
  */
  const {tables, customers} = useSelector((state) => state.reducer)
  
  const customerArr = customers.map(customer => {
    const tableOn = tables.filter(table => table.settings.tableOn)
    const tableOfCustomer = tableOn.map((table) => {
      // console.log(table)  
      const numbers = table.numbers.filter(number => number.customer === customer.id)
      const price = table.price
      const tableName = table.name
      const tableId = table.id      
      return {numbers, price, tableName, tableId}
    }).filter(table => table.numbers.length !== 0)
    // console.log(tableOfCustomer)
    const obj = {customer: customer, tableOfCustomer: tableOfCustomer}
    return obj
  })

  
  
  return(
    <div style={{
      // border: '1px solid blue',
      width: "95%",
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: "center"

    }}>
    {/* <h1 >This is Customer Page</h1> */}
    <ListCustomer customerArr={customerArr}/>
  
    </div>
  )
}