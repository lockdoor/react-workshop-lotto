import { useState } from 'react'
import {BsTrash} from 'react-icons/bs'
import { Link } from 'react-router-dom'
export default function ListTable({table, trashClickHandle}){
  const options = {day: '2-digit', month: 'long', }
  const date = new Date(table.date)
  const dateString = date.toLocaleDateString('th-TH', options)
  const [hovered, setHovered] = useState(false)
  const tableOnBgColor = '#1f8eba'
  const tableOffBgColor = '#eeeeee'
  const tableOnText = 'white'
  const tableOffText = '#ddd'
  return(
    <div className="list-table"
      style={{
        backgroundColor: table.settings.tableOn ? tableOnBgColor : tableOffBgColor,
        color: table.settings.tableOn ? tableOnText : tableOffText,
      }}
    > 
        <Link to={`${table.id}-${table.name.replace(" ", "")}`}
          onMouseEnter={()=>setHovered(true)}
          onMouseLeave={()=>setHovered(false)}
          style={{
            flex: 7,
            ...overflowText,
            fontSize: hovered ? '1.2em' : 16,
            cursor: 'pointer',
            textDecoration: 'none',
            color: table.settings.tableOn ? tableOnText : tableOffText,
          }}
        >{table.name}</Link>
      <span style={{flex:3, ...overflowText, cursor: 'default'}}>{dateString}</span>
      <span style={{
          flex:1, 
          color: table.settings.tableOn ? tableOnText : tableOffText, 
          cursor: 'pointer', 
          textAlign: 'end'}}
        onClick={()=>trashClickHandle(table)}>
          <BsTrash />
        </span>
    </div>
  )
}
const overflowText ={
  overflow: 'hidden', 
  textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  paddingRight: 10
}

