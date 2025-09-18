import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../features/products/productsApi';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

const persistConfig = { key: 'root', storage, whitelist: ['cart'] };


const rootReducer = combineReducers({
[productsApi.reducerPath]: productsApi.reducer,
cart: cartReducer,
auth: authReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
reducer: persistedReducer,
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware({ serializableCheck: false }).concat(productsApi.middleware),
});


setupListeners(store.dispatch);


export const persistor = persistStore(store);