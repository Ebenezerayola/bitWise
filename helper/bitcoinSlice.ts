import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from './store';

interface BitcoinState {
  bitcoinPrice: number | null;
  lastUpdated: string | null;
  error: string | null;
}

const initialState: BitcoinState = {
  bitcoinPrice: null,
  lastUpdated: null,
  error: null,
};

const bitcoinSlice = createSlice({
  name: 'bitcoin',
  initialState,
  reducers: {
    fetchPriceSuccess: (state, action: PayloadAction<{ price: number, timestamp: string }>) => {
      state.bitcoinPrice = action.payload.price;
      state.lastUpdated = action.payload.timestamp;
      state.error = null;
    },
    fetchPriceError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { fetchPriceSuccess, fetchPriceError } = bitcoinSlice.actions;

// Thunk action for fetching Bitcoin price
export const fetchBitcoinPrice = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    const price = response.data.bitcoin.usd;
    const timestamp = new Date().toLocaleTimeString();

    dispatch(fetchPriceSuccess({ price, timestamp }));
  } catch (error) {
    dispatch(fetchPriceError(error.message));
  }
};

export default bitcoinSlice.reducer;
