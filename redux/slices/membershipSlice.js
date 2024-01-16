import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  membershipData:[],
  activeMembershipData:{}
  
}

export const membershipSlice = createSlice({
  name: 'membership',
  initialState,
  reducers: {
    
    setMembershipData: (state, action) => {
      state.membershipData = action.payload
    },
    setActiveMembershipData: (state, action) => {
        state.activeMembershipData = action.payload
      },
    
  },
})

// Action creators are generated for each case reducer function
export const {setMembershipData, setActiveMembershipData} = membershipSlice.actions

export default membershipSlice.reducer