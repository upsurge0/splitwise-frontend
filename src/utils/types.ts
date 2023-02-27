export interface User {
  email: string
  user_id: number
  name: string
}

interface Balance {
  user: User
  amount: number
}

interface Member extends User {
  total_balance?: number
  balances?: {
    paid?: Balance[]
    owed?: Balance[]
  }
}

export type Group = {
  group_id: number
  name: null | string
  type: 'regular' | 'friend'
  simplify: boolean
  members: Member[]
}

export type Expense = {
  expense_id: number
  title: string
  amount: number
  group_id: number
  created_at: string
  updated_at:string
  type: 'multiple' | 'individual'
  paid_by: User
  members: Record<string, {
    transaction_id: number
    user: User
    owed: number
  }>
  balance: number
}
