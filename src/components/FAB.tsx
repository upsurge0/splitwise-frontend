import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import AddExpense from './AddExpense'

const FAB = () => {
  const pathname = useLocation().pathname
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex gap-4 absolute bottom-4 right-4 md:right-16">
      {(pathname === '/friends' || pathname === '/groups') && (
        <>
          <Link
            to="/groups/add"
            className="flex text-4xl items-center py-2 px-3 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg"
          >
            <BsPlus />
          </Link>
          <button className="flex items-center py-3 px-6 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg text-lg">
            Settle up
          </button>
        </>
      )}
      <button
        className="flex items-center py-3 px-6 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-lg"
        onClick={() => setIsOpen(true)}
      >
        <CgNotes stroke="#000" />
        Add expense
      </button>

      <AddExpense isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default FAB
