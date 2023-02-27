import classNames from 'classnames'
import React, { useState } from 'react'
import { CgNotes } from 'react-icons/cg'

type Props = {
  odd?: boolean
}

const Transaction = ({ odd = true }: Props) => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div
      className={classNames(
        'flex gap-8 hover:outline-primary outline-none rounded-lg px-8 py-4 cursor-pointer',
        odd && 'bg-[#25272e]'
      )}
    >
      <div className="flex flex-col items-center">
        <span>FEB</span>
        <span className="text-2xl">21</span>
      </div>

      <div className="bg-[#2f3044] px-2 py-2 text-4xl rounded-lg flex items-center justify-center">
        <CgNotes />
      </div>

      <div className="flex items-center justify-center text-2xl">
        <span>Food</span>
      </div>

      <div className="flex flex-1 justify-end gap-8">
        <div className="flex flex-col items-center justify-center">
          <span>you paid</span>
          <span className="font-bold tracking-widest">$1.3</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span>you lent</span>
          <span className="font-bold tracking-widest text-green">$1.3</span>
        </div>
      </div>
      <div className={classNames(dropdown ? 'flex':'hidden')}>

      </div>
    </div>
  )
}

export default Transaction
