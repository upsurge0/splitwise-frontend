import { useState } from 'react'
import { BsPlus } from 'react-icons/bs'
import { CgNotes } from 'react-icons/cg'
import { Link, matchPath, useLocation } from 'react-router-dom'
import AddExpense from './AddExpense'
import SettleUp from './SettleUp'

type Props = {
  fetch?: () => void
}

const FAB = ({ fetch }: Props) => {
  const pathname = useLocation().pathname
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [isSettleUpOpen, setIsSettleUpOpen] = useState(false)

  return (
    <div className="flex gap-4 absolute bottom-4 right-4 md:right-16">
          <Link
            to="/groups/add"
            className="flex text-4xl items-center py-2 px-3 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg"
          >
            <BsPlus />
          </Link>
      {(
        matchPath(
          {
            path: '/groups/:id',
          },
          pathname
        )) && (
        <>
          <button
            className="flex items-center py-3 px-6 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg text-lg"
            onClick={() => setIsSettleUpOpen(true)}
          >
            Settle up
          </button>
        </>
      )}
      <button
        className="flex items-center py-3 px-6 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-lg"
        onClick={() => setIsAddExpenseOpen(true)}
      >
        <CgNotes stroke="#000" />
        Add expense
      </button>

      <AddExpense
        isOpen={isAddExpenseOpen}
        setIsOpen={setIsAddExpenseOpen}
        fetch={fetch}
      />
      <SettleUp isOpen={isSettleUpOpen} setIsOpen={setIsSettleUpOpen} fetch={fetch} />
    </div>
  )
}

export default FAB
