import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice';
import cryptoReducer from './slices/CryptoSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        crypto: cryptoReducer,
    }
});