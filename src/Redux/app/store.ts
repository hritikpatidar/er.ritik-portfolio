import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import loginFromSlice from '../reduxSlice/adminServices/loginSlice'
import userLoginSlice from '../reduxSlice/userServices/userLoginSlice'

const persistConfig = {
  key: 'user',
  storage,
}

const adminConfig = {
  key: 'admin',
  storage,
}

// Combining user-related reducers
const userReducerData = combineReducers({
  userLoginSlice,
})

// Combining admin-related reducers
const adminReducerData = combineReducers({
  loginFromSlice,
})

// Applying persistence to the reducers
const userPersistedReducer = persistReducer(persistConfig, userReducerData);
const adminPersistedReducer = persistReducer(adminConfig, adminReducerData);

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
    admin: adminPersistedReducer,
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)

