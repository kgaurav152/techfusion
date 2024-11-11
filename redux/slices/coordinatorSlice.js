import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coordinator: [],
};

const coordinatorSlice = createSlice({
  name: "coordinator",
  initialState: initialState,
  reducers: {
    setCoordinator(state, value) {
      state.coordinator = value.payload;
    },
  },
});

export const { setCoordinator } = coordinatorSlice.actions;
export default coordinatorSlice.reducer;
