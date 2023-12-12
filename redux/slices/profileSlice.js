import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
   userDetails:null,
   participateIn : []
};

const profileSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers : {
        setUserDetails(state, value) {
            state.user = value.payload;
          },
           
        // setEvent(state,value) {
        //     state.token = value.payload;
        // }
    }
});

export const { setUserDetails } = profileSlice.actions;
export default profileSlice.reducer;