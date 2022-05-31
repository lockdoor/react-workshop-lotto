import { createSlice } from "@reduxjs/toolkit";

const customers = [
  {
    id: 1,
    name: "ต้น"
  },
  {
    id: 2,
    name: "อร"
  }
]

const lottodata = {
  customerId: 3,
  tableId: 1,
  customers: customers,
  tables: []}
export const reducer = createSlice({
  name: 'reducer',
  initialState: localStorage.getItem('lottodata') 
      ? JSON.parse(localStorage.getItem('lottodata'))
      : lottodata,  
  reducers: {
    addTable: (state, action) => {
      state.tableId += 1
      state.tables.push(action.payload)
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    removeTable: (state, action) => {
      const tables = state.tables.filter(table => {
        return table.id !== action.payload
      })
      state.tables = tables
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    addCustomer: (state, action) => {
      const customerObj = {id: state.customerId, name: action.payload}
      state.customerId += 1
      state.customers.push(customerObj)
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    addCustomertoNumber: (state, action) => {
      const { number, tableId, customerName } = action.payload
      console.log(customerName)
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      const numberIndex = state.tables[tableIndex].numbers.findIndex(el => el.num === number)
      state.tables[tableIndex].numbers[numberIndex].customer = customerName
      localStorage.setItem('lottodata', JSON.stringify(state))
    }
  }
})

export default reducer.reducer
export const {addTable, removeTable, addCustomer, addCustomertoNumber} = reducer.actions