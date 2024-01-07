import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
   event:[], 
};

const eventSlice = createSlice({
    name:'event',
    initialState:initialState,
    reducers : {
        setEvent(state, value) {
            state.event = value.payload;
          },
        
    }
});

export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;