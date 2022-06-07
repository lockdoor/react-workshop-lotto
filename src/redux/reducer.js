import { createSlice } from "@reduxjs/toolkit";
import * as data from './mockup.json'
// const customers = [
//   {
//     id: 1,
//     name: "ต้น"
//   },
//   {
//     id: 2,
//     name: "อร"
//   }
// ]

const lottodata = data
// {
//   customerId: 3,
//   tableId: 1,
//   customers: [],
//   tables: []}
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
      // console.log(customerName)
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      const numberIndex = state.tables[tableIndex].numbers.findIndex(el => el.num === number)
      state.tables[tableIndex].numbers[numberIndex].customer = customerName
      const today = new Date()
      state.tables[tableIndex].numbers[numberIndex].reserve = today.toISOString()
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    removeCustomerFromNumber: (state, action) => {
      const { number, tableId } = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      const numberIndex = state.tables[tableIndex].numbers.findIndex(el => el.num === number)
      const numObj = {customer: false, num: number, paid: false, reserve: false}
      state.tables[tableIndex].numbers[numberIndex] = numObj
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setPaidSingleNumber: (state, action) => {
      const { number, tableId, isCheck } = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      const numberIndex = state.tables[tableIndex].numbers.findIndex(el => el.num === number)
      const today = new Date()
      state.tables[tableIndex].numbers[numberIndex].paid = 
        isCheck ? today.toISOString() : false
      localStorage.setItem('lottodata', JSON.stringify(state))      
    },
    setPaidAllNumber: (state, action) => {
      const { customer, tableId, isCheck} = action.payload
      // console.log(action.payload)
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      // const numberIndex = state.tables[tableIndex].numbers.findIndex(el => el.num === number)
      const today = new Date()
      state.tables[tableIndex].numbers.forEach((num, i) => {
        if(num.customer === customer){
          state.tables[tableIndex].numbers[i].paid = 
          isCheck ?false : today.toISOString()
        }
      })
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setTableStatus: (state, action) => {
      const {tableId, status} = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      state.tables[tableIndex].settings.tableOn = status
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setTableEmoji: (state, action) => {
      const {tableId, emoji} = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      state.tables[tableIndex].settings.emoji = emoji
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setTablePrice: (state, action) => {
      const {tableId, price} = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      state.tables[tableIndex].price = price
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setTableName: (state, action) => {
      const {tableId, tableName} = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      state.tables[tableIndex].name = tableName
      localStorage.setItem('lottodata', JSON.stringify(state))
    },
    setTableDate: (state, action) => {
      const {tableId, tableDate} = action.payload
      const tableIndex = state.tables.findIndex(table => table.id === tableId)
      state.tables[tableIndex].date = tableDate
      localStorage.setItem('lottodata', JSON.stringify(state))
    }

  }
})

export default reducer.reducer
export const {addTable, removeTable, addCustomer, 
  addCustomertoNumber, removeCustomerFromNumber,
  setPaidSingleNumber, setPaidAllNumber, setTableStatus,
  setTableEmoji, setTablePrice, setTableName, setTableDate
} = reducer.actions