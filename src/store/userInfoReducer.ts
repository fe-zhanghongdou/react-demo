import { createSlice } from '@reduxjs/toolkit'

interface UserInfo {
  name: string;
  age: number;
}

const initialState = {
  name: 'nick',
  age: 32
}

const userSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo(state, action): void {
      state.name = action.payload.name;
      state.age = action.payload.age;
    }
  }
})

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;