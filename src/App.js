// import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './page/home/Home'
import Table from './page/table/Table'
import Customer from './page/customer/Customer';
import Dashboard from './page/dashboard/Dashboard';
import Nav from './component/Nav';

function App() {
  

  return (     
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='table'>
          <Route path=":params" element={<Table />}/>
        </Route>
        <Route path='customer' element={<Customer />}/>
        <Route path='dashboard' element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
