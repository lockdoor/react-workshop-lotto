import {BiBookAdd} from 'react-icons/bi'
import {useRef} from 'react'
export default function FormAddTable({
  name, desc, price, date,
  setName, setDesc, setPrice, setDate, 
  formSubmit
}) {
  const dateInputRef = useRef(null)
  const dateInputfocus = () => {
    // console.log(dateInputRef)
    dateInputRef.current.showPicker()
  }
  return (
    <form className='home-add-table-form'
      onSubmit={formSubmit}>
      <div className='input-group'>
        <label>ชื่อตาราง: </label>
        <input type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='input-group'>
        <label>รายละเอียด: </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc((e.target.value).toString())} />
      </div>
      <div className='input-group'>
        <label>ราคา: </label>
        <input type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div className='input-group'>
        <label>งวดวันที่: </label>
        <input type="date"
          ref={dateInputRef}
          onFocus={dateInputfocus}
          value={date}
          onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className='btn-submit'>
        <button type='submit'>
          <span className='group-btn-text'>
            <span>เพิ่มตาราง</span>
            <BiBookAdd />
          </span>
        </button>
      </div>
    </form>
  )
}