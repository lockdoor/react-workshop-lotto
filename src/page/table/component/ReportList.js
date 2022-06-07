import { AiOutlineCheckCircle, AiOutlineMinusCircle} from 'react-icons/ai'
// import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setPaidSingleNumber, setPaidAllNumber } from '../../../redux/reducer'
import { ToastContainer, toast, Slide } from 'react-toastify'

const toastProp = {
  position: "top-center",
      transition: Slide,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
}

export default function ReportList({table}){

  // const [hovered, setHovered] = useState(false)
  const {customers} = useSelector((state) => state.reducer)
  const dispatch = useDispatch()
  

  const paidCheckSingle = (e) => {
    // console.log(e.target.value, e.target.checked)
    dispatch(setPaidSingleNumber({
      number: e.target.value,
      tableId: table.id,
      isCheck: e.target.checked
    }))
    e.target.checked 
    ? toast.success(`หมายเลข ${e.target.value} ทำการจ่ายเงินแล้ว`, {
      ...toastProp
      })
    : toast.error(`หมายเลข ${e.target.value} ยกเลิกการจ่ายเงินแล้ว`, {
      ...toastProp
      })
  }
  const paidCheckAll = (customer) => {
    // console.log(customer)
    const isCheck = isAllPaid(customer.nums)
    dispatch(setPaidAllNumber({
      customer: customer.name,
      tableId: table.id,
      isCheck: isCheck
    }))
    isCheck
    ? toast.error(`ลูกค้า ${customer.name} ยกเลิกการจ่ายเงินทั้งหมดแล้ว`, {
      ...toastProp
      })
    : toast.success(`ลูกค้า ${customer.name} ทำการจ่ายเงินทั้งหมดแล้ว`, {
      ...toastProp
      })
  }
  const isAllPaid = (numbers) => {
    // console.log(numbers.some(number => number.paid != false ))
    return !numbers.some(number => number.paid === false )
  }
  
  let customersArr = table.numbers.filter(number => number.customer !== false)
    .map(number=>number.customer)
  customersArr = [...new Set(customersArr)]
  customersArr = customersArr.map(customer => {
    const nums = table.numbers.filter(number => number.customer === customer)    
    // console.log(nums)
    return {name: customer, nums: nums}
  })

  let findCustomerId = (customerName) => {
    const customer = customers.find(customer => customer.name === customerName)
    return customer.id
  }

  
  return(
    <ul 
      style={{
        width: '95%',
        listStyle: 'none',
        padding: 0,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column'
    }}>
      {customersArr.map(customer => (
        <li key={customer.name} 
          className="list-table"
        >
          {/* name */}
          <Link to={`../../customers/${findCustomerId(customer.name)}-${customer.name}`}
            style={{
              flex: 2,
              ...overflowText,
              cursor: table.settings.tableOn ? "pointer" : "default"
          }}>{customer.name}</Link>
          
          {/* number */}
          <span style={{
            flex:5, 
            diplay: 'flex', 
            flexWrap: 'wrap'
          }}>            
            {customer.nums.map(num=>(
              <label key={num.num}
                style={{
                  display: 'inline-block',
                  marginRight: 10,
                  color: num.paid ? 'blue' : 'red'
              }}>
                <input type="checkbox" value={num.num}
                  disabled={!table.settings.tableOn}
                  onChange={paidCheckSingle}
                  checked={num.paid ? 'checked' : ""}
                  />{num.num}</label>
            ))}            
          </span>

          {/* check Paid */}
          <span style={{
            flex:1, color:'red', 
            cursor: table.settings.tableOn ? "pointer" : "default"            
            // border: '1px solid blue',             
          }}>
            <span
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // border: '1px solid red',
                height: '100%'
              }}
            >{ isAllPaid(customer.nums)
              ? <AiOutlineCheckCircle size={18} color="blue"
                  onClick={table.settings.tableOn ? ()=>paidCheckAll(customer) : ()=>{}}
                />
              : <AiOutlineMinusCircle size={18} color="red"
                  onClick={table.settings.tableOn ? ()=>paidCheckAll(customer) : ()=>{}}
                />
            }
            </span>
          </span>
        </li>
      ))}
      <ToastContainer />
    </ul>    
  )
}

const overflowText ={
  overflow: 'hidden', 
  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  paddingRight: 10,
  paddingLeft: 5,
  // border: '1px solid blue'
}
// const normal = {
//     flex: 2,
//     ...overflowText,
//     cursor: "pointer"
//   }
// const hover = {
//     ...normal,
//     color: '#1f8eba',
//     fontSize: '1.2em'
//   }