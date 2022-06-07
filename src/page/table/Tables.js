import { useState, useEffect } from 'react'
import { BiBookAdd, BiBlock } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { addTable, removeTable } from '../../redux/reducer'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import '../home/Home.css'
import FormAddTable from './component/FormAddTable'
import ListTable from './component/ListTable'
import RemoveTableDialog from './component/RemoveTableDiaLog'


export default function Tables() {
  const state = useSelector((state) => state.reducer)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [showAddtable, setShowAddTable] = useState(false)
  const [showRemoveTableDialog, setShowRemoveTableDialog] = useState(false)
  const [tableToRemove, setTableToRemove] = useState('')
  const [tableBydate, setTableBydate] = useState([])

  const checkWrongInput = (value) => {
    return value.trim() === '' ? true : false
  }
  
  const formSubmit = (e) => {
    e.preventDefault()
    if (checkWrongInput(name)) {
      alert('ชื่อตารางไม่ถูกต้อง')
      return
    } else if (checkWrongInput(desc)) {
      alert('รายละเอียดไม่ถูกต้อง')
      return
    } else if (checkWrongInput(price)) {
      alert('ราคาไม่ถูกต้อง')
      return
    } else if (checkWrongInput(date)) {
      alert('งวดวันที่ไม่ถูกต้อง')
      return
    }
    const numbers = []
    for (let i = 0; i < 100; i++) {
      const num = i.toString()
      numbers.push({
        num: num.length === 1 ? "0" + num : num,
        customer: false,
        reserve: false,
        paid: false
      })
    }
    const tableObject = {
      id: state.tableId,
      name: name,
      desc: desc,
      date: date,
      price: price,
      numbers: numbers,
      settings: {
        tableOn: true,
        emoji: '🍎'
      }
    }

    dispatch(addTable(tableObject))

    setName('')
    setDesc('')
    setPrice('')
    setDate('')
    setShowAddTable(false)
    toast.success('เพิ่มตารางเรียบร้อยแล้ว', {
      position: "top-center",
      transition: Slide,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored'
      });
  }
  
  const trashClickHandle = (table) => {

    setTableToRemove(table)
    setShowRemoveTableDialog(true)
  }
  useEffect(()=>{   
    const tables = [...state.tables]
    // console.log(tables)
    tables.sort((a, b) => {
      // console.log(new Date(a.date).getTime()/1000)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
    setTableBydate(tables)
  },[state])

  return (
    <div className='home-container'>
      {/* <div className='home-logo-container'>
        <img className='home-logo'
          src={require('../../assets/logo.svg').default} alt="logo" />
      </div> */}
      <button className='home-add-table-btn'
        style={{
          backgroundColor: showAddtable ? 'red' : '#44dc53'
        }}
        onClick={() => setShowAddTable(!showAddtable)}>
        {showAddtable
          ? <span className='group-btn-text'>
            <span>ยกเลิกเพิ่มตาราง</span>
            <BiBlock />
          </span>
          : <span className='group-btn-text'>
            <span>เพิ่มตาราง</span>
            <BiBookAdd />
          </span>}
      </button>
      
      {showAddtable &&
        <FormAddTable name={name} desc={desc}
          price={price} date={date} setName={setName}
          setDesc={setDesc} setPrice={setPrice}
          setDate={setDate} formSubmit={formSubmit} />
      }

      {state.tables.length !== 0 && tableBydate.map((table) => {
        return (
          <ListTable key={table.id} table={table} 
            trashClickHandle={trashClickHandle} />
        )
      })}

      <RemoveTableDialog 
        showRemoveTableDialog={showRemoveTableDialog}
        setShowRemoveTableDialog={setShowRemoveTableDialog}
        action={()=>dispatch(removeTable(tableToRemove.id))}
        title={tableToRemove.name}
        content="หากต้องการลบกรุณากดยืนยัน"
        />
      <ToastContainer />
    </div>
  )
}