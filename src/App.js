// import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './page/home/Home'
import Table from './page/table/Table'
import Customers from './page/customer/Customers';
import Nav from './component/Nav';
import Customer from './page/customer/Customer';
import Tables from './page/table/Tables';

function App() {
  

  return (     
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/'  element={<Home />}/>
        
        <Route path='tables'>
          <Route path='' element={<Tables />} />
          <Route path=":params" element={<Table />}/>
        </Route>
        
        <Route path='customers'>
          <Route path='' element={<Customers />} />
          <Route path=':params' element={<Customer />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
