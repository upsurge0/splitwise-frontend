export type User = {
  email: string
  user_id: number
  name: string
}

export type Group = {
  group_id: number
  name: null | string
  type: 'regular' | 'friend'
  members: User[]
}
