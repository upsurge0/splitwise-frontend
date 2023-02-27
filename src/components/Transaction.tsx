import classNames from 'classnames'
import React, { useState } from 'react'
import { CgNotes } from 'react-icons/cg'
import { Expense } from '../utils/types'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import avatar from '../assets/avatar.svg'

type Props = {
  even?: boolean
  expense: Expense
}

const Transaction = ({ even = true, expense: e }: Props) => {
  const [dropdown, setDropdown] = useState(false)
  const user = useSelector((state: RootState) => state.user)

  return (
    <div>
      <div
        className={classNames(
          'flex gap-8 hover:outline-primary outline-none rounded-lg px-8 py-4 cursor-pointer',
          even ? 'bg-[#25272e]' : 'border-divider border'
        )}
        onClick={() => setDropdown((d) => !d)}
      >
        <div className="flex flex-col items-center">
          <span>{moment(e.created_at).format('MMM').toUpperCase()}</span>
          <span className="text-2xl">
            {moment(e.created_at).format('DD').toUpperCase()}
          </span>
        </div>
        <div className="bg-[#2f3044] px-2 py-2 text-4xl rounded-lg flex items-center justify-center">
          <CgNotes />
        </div>
        <div className="flex items-center justify-center text-2xl">
          <span>{e.title}</span>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex flex-col items-end justify-center">
            <span className="text-gray-300">
              {e.paid_by.user_id === user.user_id
                ? 'you paid'
                : `${e.paid_by.name} paid`}
            </span>
            <span className="font-semibold tracking-widest">${e.amount}</span>
          </div>
          <div className="flex flex-col items-start justify-center md:w-[150px]">
            <span className="text-gray-300">
              {e.paid_by.user_id === user.user_id
                ? 'you lent'
                : `${e.paid_by.name} lent you`}
            </span>
            <span
              className={classNames(
                'font-semibold tracking-widest',
                e.paid_by.user_id === user.user_id ? 'text-green' : 'text-red'
              )}
            >
              ${e.members[user.user_id]?.owed ?? 0}
            </span>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          dropdown ? 'flex' : 'hidden',
          'px-4 py-6 border-divider border-x border-b rounded-lg rounded-t-none'
        )}
      >
        <div className="divide-y divide-divider w-full flex flex-col gap-4">
          <div className="flex gap-6">
            <div className="bg-[#2f3044] px-4 py-4 text-6xl rounded-lg flex items-center justify-center">
              <CgNotes />
            </div>
            <div className="flex flex-col">
              <span className="text-xl">{e.title}</span>
              <span className="text-xl font-semibold">
                ${e.amount.toFixed(2)}
              </span>
              <span className="text-lg">
                Added by {e.paid_by.name} on{' '}
                {moment(e.created_at).format('MMMM Do YYYY')}
              </span>
            </div>
          </div>
          <div className="pt-6 flex flex-col gap-4 pl-4">
            <div className="flex items-center gap-4 text-lg">
              <img src={avatar} alt="avatar" className="h-12" />
              <span className="flex gap-1">
                <span className="font-semibold">{e.paid_by.name}</span>
                paid
                <span className="font-semibold">${e.amount}</span>
                and owes
                <span className="font-semibold">
                  ${e.members[e.paid_by.user_id].owed}
                </span>
              </span>
            </div>
            {Object.entries(e.members)
              .filter(([user_id]) => e.paid_by.user_id !== +user_id)
              .map(([_, v]) => (
                <div className="flex items-center gap-4 text-lg">
                  <img src={avatar} alt="avatar" className="h-12" />
                  <span className='flex gap-1'>
                    <span className='font-semibold'>{v.user.name}</span>
                     owes 
                    <span className='font-semibold'>${v?.owed ?? 0}</span>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
