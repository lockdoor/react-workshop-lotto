import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from "react"
import ModalAssignCustomer from "./component/ModalAssignCustomer"

export default function Home(){
  const {params} = useParams()
  const {tables, customers} = useSelector((state) => state.reducer)
  const initTable = () => {
    const id = params.split('-')[0]
    const index = tables.findIndex(table => table.id === parseInt(id))
    return tables[index]
  }
  const table = initTable()
  const [tableHeight, setTableHeight] = useState(null)
  const tableRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectNumber, setSelectNumber] = useState({})

  const openModalHandle = (number) => {    
      setSelectNumber(number)
      setOpenModal(true)       
  }
  
  useEffect(()=>{
    setTableHeight(tableRef.current.offsetWidth)
    window.addEventListener('resize', ()=>setTableHeight(tableRef.current.offsetWidth))
  },[])

  // useEffect(()=>{
  //   console.log(selectNumber)
  // }, [selectNumber])

  return(
    <div style={{
      width: '100%',
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h2>{table.name}</h2>
      <p>{table.desc}</p>
      <div
        ref={tableRef}
        id="table"
        className="table"
        style={{
          width: '95%',
          maxWidth: 500,
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
        }}
      >
        {table.numbers.map( number => {
          return(
            <div key={number.num}
              onClick={()=>openModalHandle(number)}
              className="table-number"
              style={{
                border: '1px solid orange',
                height: tableHeight/11,
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                cursor: "pointer",
                wordBreak: "break-word",
                color: number.customer ? "red" : "black"
              }}
            >{number.customer ? 'R' : number.num}</div>
          )
        })}
        
      </div>  
      <ModalAssignCustomer 
          open={openModal}
          onClose={()=>setOpenModal(false)}
          customers={customers}
          number={selectNumber}
          tableId={table.id}
        />    
    </div>
  )
}