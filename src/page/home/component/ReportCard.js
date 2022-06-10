import { useState } from "react"
import { VictoryPie } from "victory"
import { Link } from "react-router-dom"
export default function ReportCard({table}){
  const [hovered, setHovered] = useState(false)
  const options = {day: '2-digit', month: 'long', year: 'numeric'}
  const date = new Date(table.date)
  const dateString = date.toLocaleDateString('th-TH', options)
  const {numbers} = table
  const reserve = numbers.filter(number=>number.reserve).length
  const paid = numbers.filter(number=>number.paid).length
  // const paidScale = reserve /100*paid
  const unPaidScale = reserve - paid
  // const unPaid = 100 - paid
  const unResrve = 100 - reserve
  // console.log(`${reserve}-${paid} = `, reserve - paid)
  const data = [
    {x: `ยังไม่จ่าย = ${unPaidScale}`, y: unPaidScale},
    {x: `จ่ายแล้ว = ${paid}`, y: paid},
    // {x: "unPaid", y: unPaid},
    {x: `ว่าง = ${unResrve}`, y: unResrve}
  ]
  const colors = ['cyan', 'navy', 'orange']
  


  // console.log(reserve, unResrve, paid, unPaid)

  return(
    <div
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
      style={{
        display: 'flex',
        maxWidth: 350,
        minWidth: 300,
        width: '100%',
        // height: 400,
        // border: '1px solid black',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        // zIndex: -1,
        padding: 5,
        backgroundColor: '#f5f5f5',
        margin: '10px 10px',
        borderRadius: 5,
        boxShadow: hovered ? '2px 2px 20px black' : 'none'
    }}>
      
        <Link to={`tables/${table.id}-${table.name}`}
          style={{
            textDecoration: 'none',
            fontSize: 24,
            color: '#1f8eba'
          }}
        >{table.name}</Link>
      
      <div>{dateString}</div>
      <div>ราคา {table.price}</div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      
        width: '100%'
      }}>
        {colors.map((color, index) => (
          <div key={color}
            style={{
              display: 'flex',
              alignItems: "center"              
          }}>
            <span style={{
              width: 10,
              height: 10,
              backgroundColor: color,
              // display: 'inline'
            }}></span>
          <span style={{fontSize: 10}}>{`${data[index].x}`}</span>
          </div>
        ))}
      </div>
      <VictoryPie data={data} colorScale={colors}
        labels={() => null}
      />
      
    </div>
  )
}
