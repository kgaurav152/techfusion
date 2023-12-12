import {createSlice} from '@reduxjs/toolkit'

const initialState =  {
   user:null,
   participateIn : []
};

const profileSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers : {
        setUser(state, value) {
            state.user = value.payload;
          },
           
        // setEvent(state,value) {
        //     state.token = value.payload;
        // }
    }
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;