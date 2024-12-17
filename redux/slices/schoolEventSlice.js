import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  schoolEvent: [],
};

const schoolEventSlice = createSlice({
  name: "schoolEvent",
  initialState: initialState,
  reducers: {
    setSchoolEvent(state, value) {
      state.schoolEvent = value.payload;
    },
  },
});

export const { setSchoolEvent } = schoolEventSlice.actions;
export default schoolEventSlice.reducer;
