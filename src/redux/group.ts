import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Group } from '../utils/types'

interface GroupState {
    groups: Group[]
}

const initialState: GroupState = {
    groups: []
}

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      const groups = action.payload
      state.groups = groups
    }
  },
})

// Action creators are generated for each case reducer function
export const { setGroups } = groupSlice.actions

export default groupSlice.reducer
