import { CgNotes } from 'react-icons/cg'
import Modal from './Modal'
import { FormEvent, useEffect, useState } from 'react'
import _ from 'lodash-es'
import Scrollbar from 'smooth-scrollbar'
import SplitCard, { SplitType } from './SplitCard'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import { Group } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { v4 as uuid } from 'uuid'
import { Member, resetExpense, setExpenses } from '../redux/expense'
import { toastify } from '../utils/notifications'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExpense = ({ isOpen: isAddExpenseOpen, setIsOpen }: Props) => {
  const [title, setTitle] = useState('')
  const [totalAmount, setTotalAmount] = useState<number>()
  const [splitType, setSplitType] = useState<SplitType['type']>('equal')
  const [groupId, setGroupId] = useState<number>()

  const [isSplitOptionsOpen, setIsSplitOptionsOpen] = useState(false)
  const axiosInstance = useAxiosInstance()
  const [groups, setGroups] = useState<Group[]>([])
  const user = useSelector((state: RootState) => state.user)
  const expense = useSelector((state: RootState) => state.expense)
  const dispatch = useDispatch()

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get('/groups')
      setGroups(
        (res.data as Group[]).map((g) => {
          if (g.type === 'friend') {
            const friend = g.members.filter(
              (i) => i.user_id !== user.user_id
            )[0].name
            return { ...g, name: friend }
          }
          return g
        })
      )
    } catch (e) {}
  }

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault()
    
    if(!title) {
      return toastify('Description required', 'error')
    } 
    if(!totalAmount) {
      return toastify('Total amount required', 'error')
    } 

    let members

    const group = groups.find(g => g.group_id === groupId)

    if(splitType === 'equal') {
      members = expense.members.map(m => {
        return {...m, amount: totalAmount / group?.members?.length!}
      })
    } else if (splitType === 'exact') {
      const sum = expense.members.map(m => m.amount).reduce((a, b) => a + b, 0)
      if(sum !== totalAmount) return toastify('The sum should equal the total amount', 'error')
      members = expense.members
    }
    const data = {
      title,
      amount: totalAmount,
      paid_by_id: user.user_id,
      category: group?.type === 'regular' ? 'multiple' : 'individual',
      members: members
    }
    console.log(data)
  }

  useEffect(() => {
    fetchGroups()
  }, [])
  useEffect(() => {
    if (groups.length > 0 && groupId === undefined)
      setGroupId(groups[0].group_id)
  }, [groups])

  useEffect(() => {
    const members: Member[] = groups
      .find((g) => g.group_id === groupId)
      ?.members?.map((m) => {
        return { user_id: m.user_id, amount: 0 }
      })!
    if (members?.length > 0) {
      dispatch(resetExpense())
      dispatch(setExpenses({ groupId: groupId!, members }))
    }
  }, [groupId])

  return (
    <>
      <Modal
        open={isAddExpenseOpen}
        onClose={() => {
          setIsOpen(false)
          setIsSplitOptionsOpen(false)
        }}
        title="Add an expense"
        className="pb-6"
        double
      >
        <form onSubmit={handleSubmit}>
          <div className="flex pt-10">
            <div className="bg-[#2f3044] px-4 py-4 text-8xl rounded-lg">
              <CgNotes />
            </div>
            <div className="px-4 py-4 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter a Description"
                className="bg-[#242731] outline-none text-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex items-end">
                <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-[#242731] outline-none text-4xl max-w-[200px] overflow-hidden w-fit"
                  onWheel={(e) => e.currentTarget.blur()}
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(+e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-8 tracking-wider`">
            <span>
              with you and{' '}
              <select
                className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
                value={groupId}
                onChange={(e) => setGroupId(+e.target.value)}
              >
                {groups.map((g) => (
                  <option key={g.group_id} value={g.group_id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </span>
            <span>
              paid by{' '}
              <button className="bg-[#2f3044] hover:bg-[#4d4a64] rounded-xl px-2 text-primary">
                name
              </button>
              and split
              <button
                className="bg-[#2f3044] hover:bg-[#4d4a64] rounded-xl px-2 text-primary"
                onClick={() => setIsSplitOptionsOpen(true)}
              >
                equally
              </button>
            </span>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              className="flex items-center py-3 px-5 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg text-md"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button className="flex items-center py-3 px-5 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-md" type='submit'>
              Save
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={isSplitOptionsOpen}
        onClose={() => setIsSplitOptionsOpen(false)}
        title="Choose split options"
        className="top-[78%] pb-0 h-[268px]"
      >
        <div className="w-[400px]"></div>
        <div className="pt-8">
          <select
            className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
            value={splitType}
            // @ts-ignore
            onChange={(e) => setSplitType(e.target.value)}
          >
            <option value="equal">Equally</option>
            <option value="exact">Exact Amounts</option>
            <option value="percentages">Percentages</option>
            <option value="shares">Shares</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="flex flex-col max-h-[144px] gap-4 scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg">
            <div>
              {groups
                .find((g) => g.group_id === groupId)
                ?.members?.map((m) => {
                  return (
                    <SplitCard
                      key={uuid()}
                      type={splitType}
                      user={m}
                      groupId={groupId!}
                    />
                  )
                })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddExpense
