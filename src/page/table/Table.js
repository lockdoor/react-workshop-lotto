import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from "react"
import ModalAssignCustomer from "./component/ModalAssignCustomer"
import ReportList from "./component/ReportList"
import { BsGear } from "react-icons/bs"
import DrowerSetting from "./component/DrawerSetting"
// import { tab } from "@testing-library/user-event/dist/tab"

export default function Home(){
  const {params} = useParams()
  const {tables, customers} = useSelector((state) => state.reducer)
  const initTable = () => {
    const id = params.split('-')[0]
    const index = tables.findIndex(table => table.id === parseInt(id))
    return tables[index]
  }
  const table = initTable()
  // const [tableHeight, setTableHeight] = useState(null)
  // const tableRef = useRef(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectNumber, setSelectNumber] = useState({})
  const [openDrawer, setOpenDrawer] = useState(false)

  // console.log(tableRef)
  const openModalHandle = (number) => {    
      setSelectNumber(number)
      setOpenModal(true)       
  }
  
  // useEffect(()=>{
  //   if(tableRef !== null){
  //     setTableHeight(tableRef.current.offsetWidth)
  //     window.addEventListener('resize', 
  //       ()=>setTableHeight(tableRef.current.offsetWidth))
  //   }
      
    
  // },[])

  return(
    <div style={{
      width: '100%',
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <DrowerSetting open={openDrawer} close={()=>setOpenDrawer(false)} table={table}/>
      <div style={{
        position: 'fixed',
        top: 0,
        margin: '10px 0',
        transform: 'translateX(800%)'
      }}><BsGear size={24}
            onClick={() => setOpenDrawer(!openDrawer)}
            style={{
              cursor: 'pointer'
            }}
        />
      </div>
      <h2>{table.name}</h2>
      <p>{table.desc}</p>
      <div
        // ref={tableRef}
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
              onClick={table.settings.tableOn ? ()=>openModalHandle(number) : () => {}}
              className="table-number"
              style={{
                border: '1px solid orange',
                aspectRatio: 1,                
                display: 'flex',
                justifyContent: "center",
                alignItems: 'center',
                cursor: table.settings.tableOn ? "pointer" : "default",
                wordBreak: "break-word",
                color: number.customer ? "red" : "black"
              }}
            >{number.customer ? table.settings.emoji : number.num}</div>
          )
        })}
        
      </div>  
      <ModalAssignCustomer 
          open={openModal}
          onClose={()=>setOpenModal(false)}
          customers={customers}
          number={selectNumber}
          tableId={table.id}/>
      <ReportList table={table}/>
    </div>
  )
}