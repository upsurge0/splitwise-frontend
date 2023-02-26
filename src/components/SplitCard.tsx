import { useDispatch, useSelector } from 'react-redux'
import avatar from '../assets/avatar.svg'
import { User } from '../utils/types'
import { RootState } from '../redux/store'
import { useEffect, useState } from 'react'
import { editExpense } from '../redux/expense'
import classNames from 'classnames'

export type SplitType = {
  type: 'equal' | 'exact' | 'percentages' | 'shares'
  user: User
  groupId: number
}

const SplitCard = ({ type, user, groupId }: SplitType) => {
  const amount = useSelector((state: RootState) =>
    state.expense.members?.find((m) => m.user_id === user.user_id)
  )?.amount
  const dispatch = useDispatch()
  return (
    <div className="flex items-center gap-6 py-3 px-4 rounded-lg">
      <img className="h-12" src={avatar} alt="" />
      <div className="flex flex-col flex-1">
        <span className="text-lg">{user.name}</span>
      </div>
      <div className="flex items-end">
        {(type === 'equal' || type === 'exact') && (
          <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>
        )}
        <input
          type="number"
          placeholder={
            type === 'equal' || type === 'exact' ? '0.00' : '      0'
          }
          className={classNames(
            amount === 0  && 'text-[#9ca3af]',
            'bg-[#242731] outline-none text-xl max-w-[50px] overflow-hidden shadow-md border-b border-icon disabled:placeholder:text-gray-900 disabled:border-none disabled:cursor-not-allowed'
          )}
          onWheel={(e) => e.currentTarget.blur()}
          disabled={type === 'equal'}
          min={'0'}
          defaultValue={undefined}
          value={Number(amount).toString()}
          onChange={(e) =>
            dispatch(
              editExpense({ user_id: user.user_id, amount: +e.target.value })
            )
          }
        />
        {(type === 'percentages' || type === 'shares') && (
          <span className="pb-0.5 pr-1 text-[#9ca3af]">
            {type === 'percentages' ? '%' : 'shares'}
          </span>
        )}
      </div>
    </div>
  )
}

export default SplitCard
