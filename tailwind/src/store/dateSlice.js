import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fromDate: '',
  toDate: '',
  numberValue: 0,
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setFromDate: (state, action) => {
      state.fromDate = action.payload
    },
    setToDate: (state, action) => {
      state.toDate = action.payload
    },
    setNumberValue: (state, action) => {
      state.numberValue = action.payload
    },
   
  },
})

export const { setFromDate, setToDate, setNumberValue, clearDates } = dateSlice.actions

export default dateSlice.reducer