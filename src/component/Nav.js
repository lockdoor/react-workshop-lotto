import { Link } from "react-router-dom"

export default function Nav(){
  return(
    <nav className="nav-top-main">
      <ul>
        <li>
          <Link to="/">หน้าหลัก</Link>
        </li>
        <li>
          <Link to="customers">ลูกค้า</Link>
        </li>
        <li>
          <Link to="dashboard">รายงาน</Link>
        </li>
      </ul>
    </nav>    
  )
}