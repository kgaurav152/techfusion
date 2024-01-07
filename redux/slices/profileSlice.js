import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
   user : null, 
};

const profileSlice = createSlice({
    name:'profile',
    initialState:initialState,
    reducers : {
        setUserDetails(state, value) {
            state.user = value.payload;
          },
         
    }
});

export const { setUserDetails } = profileSlice.actions;
export default profileSlice.reducer;