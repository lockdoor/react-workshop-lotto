import { useState } from 'react'
import {BsTrash} from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function ListTable({table, trashClickHandle}){
  const options = {day: '2-digit', month: 'long', }
  const date = new Date(table.date)
  const dateString = date.toLocaleDateString('th-TH', options)
  const [hovered, setHovered] = useState(false)
  return(
    <div className="list-table">
      <span style={hovered ? hover : normal}
        onMouseEnter={()=>setHovered(true)}
        onMouseLeave={()=>setHovered(false)}
      ><Link to={`table/${table.id}-${table.name}`}>{table.name}</Link></span>
      <span style={{flex:3, ...overflowText}}>{dateString}</span>
      <span style={{flex:1, color:'red', cursor: 'pointer', textAlign: 'end'}}
        onClick={()=>trashClickHandle(table)}><BsTrash /></span>
    </div>
  )
}
const overflowText ={
  overflow: 'hidden', 
  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  paddingRight: 10
}
const normal = {
    flex: 7,
    ...overflowText,
    cursor: "pointer"
  }
const hover = {
    ...normal,
    color: '#1f8eba',
    fontSize: '1.2em'
  }
