// import { useEffect, useState } from "react"

export default function NumberFromTable({number}){
  // const [check, setCheck] = useState(false)
  // useEffect(()=>{
  //   setCheck(number.paid ? )
  // },[number])
  return (
    <label style={{display: 'inline-block'}}>
      <input type="checkbox" 
        checked={number.paid ? "checked" : ""}
        readOnly
      />
      {number.num}
    </label>
  )
}