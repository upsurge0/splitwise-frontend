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
  members: Member[]
}
