import{BsTrash} from 'react-icons/bs'
export default function ListTable({table, trashClickHandle}){
  return(
    <div className="list-table">
      <span style={{flex:5, overflow: 'hidden', 
        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        paddingRight: 10}}>{table.name}</span>
      <span style={{flex:2}}>{table.date}</span>
      <span style={{flex:1, color:'red', cursor: 'pointer', textAlign: 'end'}}
        onClick={()=>trashClickHandle(table.id)}><BsTrash /></span>
    </div>
  )
}