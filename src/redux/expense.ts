import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Member {
  user_id: number
  amount: number
}

interface ExpenseState {
  groupId: number
  members: Member[]
}

const initialState: ExpenseState = {
  groupId: -1,
  members: [],
}

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<ExpenseState>) => {
      const expense = action.payload
      state.groupId = expense.groupId
      state.members = expense.members
    },
    editExpense: (state, action: PayloadAction<Member>) => {
      const member = action.payload
      if (state.members?.length === 0) state.members = []
      //   if (!state.members?.find((m) => m.user_id === member.user_id))
      //     setExpense(member)
      state.members = state.members?.map((m) => {
        if (member.user_id === m.user_id) return { ...m, amount: member.amount }
        return m
      })
    },
    resetExpense: (state) => {
      if (state.members.length > 0) {
        state.members = state.members.map((m) => {
          return { ...m, amount: 0 }
        })
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setExpenses, editExpense, resetExpense } = expenseSlice.actions

export default expenseSlice.reducer
