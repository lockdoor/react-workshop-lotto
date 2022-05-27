import { useEffect, useState } from 'react'
import { BiBookAdd, BiBlock } from 'react-icons/bi'
import './Home.css'
import FormAddTable from './component/FormAddTable'
import ListTable from './component/ListTable'
import { useSelector, useDispatch } from 'react-redux'
import { addTable, removeTable } from '../../redux/reducer'


export default function Home() {
  const state = useSelector((state) => state.reducer)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [showAddtable, setShowAddTable] = useState(false)
  const [showRemoveTableDialog, setShowRemoveTableDialog] = useState(false)


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
        customer: null,
        reserve: null,
        paid: false
      })
    }
    const tableObject = {
      id: state.tableId,
      name: name,
      desc: desc,
      date: date,
      price: price,
      numbers: numbers
    }

    dispatch(addTable(tableObject))
    setName('')
    setDesc('')
    setPrice('')
    setDate('')
    setShowAddTable(false)
  }
  const trashClickHandle = (id) => {
    setShowRemoveTableDialog(true)
    // dispatch(removeTable(id))
  }
  // useEffect(()=>{    
  //   console.log(state)},[state])

  return (
    <div className='home-container'>
      <div className='home-logo-container'>
        <img className='home-logo'
          src={require('../../assets/logo.svg').default} alt="logo" />
      </div>
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
      {state.tables.length !== 0 && state.tables.map((table) => {
        return (
          <ListTable key={table.id} table={table} 
            trashClickHandle={trashClickHandle} />
        )
      })
      }
      <div 
        className={showRemoveTableDialog
        ? 'remove-table-dialog dialog-animation'
        : 'remove-table-dialog'
      }>
        this is modal
      </div>
    </div>
  )
}