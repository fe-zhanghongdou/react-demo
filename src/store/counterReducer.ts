import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 2,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload;
        },
        decrement: (state, action) => {
            state.count -= action.payload;
        },
    }
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
