import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  canMapUsers:[],
  userMappingData:{}
  
}

export const userMappingSlice = createSlice({
  name: 'userMapping',
  initialState,
  reducers: {
    
    setCanMapUsers: (state, action) => {
        console.log("dispatched location is",action.payload)
      state.canMapUsers = action.payload
    },
    setUserMappingData: (state, action) => {
    state.userMappingData = action.payload
  }
  },
})

// Action creators are generated for each case reducer function
export const { setCanMapUsers,setUserMappingData} = userMappingSlice.actions

export default userMappingSlice.reducer