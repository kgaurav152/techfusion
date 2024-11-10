import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  campusAmbassador: [],
};

const campusAmbassadorSlice = createSlice({
  name: "campusAmbassador",
  initialState: initialState,
  reducers: {
    setCampusAmbassador(state, value) {
      state.campusAmbassador = value.payload;
    },
  },
});

export const { setCampusAmbassador } = campusAmbassadorSlice.actions;
export default campusAmbassadorSlice.reducer;
