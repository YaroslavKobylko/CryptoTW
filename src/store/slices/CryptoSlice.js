import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currencies: [],
  lastUpdate: null,
  total_value: 0,
  differenceDollar: 0,
  differencePercent: 0,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptocurrencies(state, action) {
      state.currencies = action.payload; 
      state.lastUpdate = new Date().toLocaleString();
    },
    setTotalValue(state, action) {
      state.total_value = action.payload;
    },
    setDifferenceValueDollar(state, action) {
      state.differenceDollar = action.payload;
    },
    setDifferenceValuePercent(state, action) {
      state.differencePercent = action.payload;
    }
  },
});

export const { setCryptocurrencies, setTotalValue, setDifferenceValueDollar, setDifferenceValuePercent } = cryptoSlice.actions;

export default cryptoSlice.reducer;