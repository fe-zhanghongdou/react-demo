import {  configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterReducer'
import userReducer from './userInfoReducer'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        userInfo: userReducer
    }
})

export default store;