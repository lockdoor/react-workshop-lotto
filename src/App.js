// import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './page/home/Home'
import Table from './page/table/Table'
import Customers from './page/customer/Customers';
import Dashboard from './page/dashboard/Dashboard';
import Nav from './component/Nav';
import Customer from './page/customer/Customer';

function App() {
  

  return (     
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='table'>
          <Route path=":params" element={<Table />}/>
        </Route>
        {/* <Route path='customers' element={<Customers />}>
          <Route path='../:params' element={<Customer />} />
        </Route>
        <Route path='customers/:params' element={<Customer />} /> */}
        <Route path='customers'>
          <Route path='' element={<Customers />} />
          <Route path=':params' element={<Customer />} />
        </Route>

        <Route path='dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
