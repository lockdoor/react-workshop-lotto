import { createSlice } from "@reduxjs/toolkit";

const lottodata = {
  customerId: 1,
  tableId: 1,
  customers: [],
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
    }
  }
})

export default reducer.reducer
export const {addTable, removeTable} = reducer.actions