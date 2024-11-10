import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  volunteer: [],
};

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: initialState,
  reducers: {
    setVolunteer(state, value) {
      state.volunteer = value.payload;
    },
  },
});

export const { setVolunteer } = volunteerSlice.actions;
export default volunteerSlice.reducer;
