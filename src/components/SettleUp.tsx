import Modal from './Modal'
import avatar from '../assets/avatar.svg'
import { HiArrowRight } from 'react-icons/hi'
import { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import classNames from 'classnames'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import { useParams } from 'react-router-dom'
import { Group } from '../utils/types'
import { toastify } from '../utils/notifications'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  fetch?: () => void
}

const SettleUp = ({ isOpen: isSettleUpOpen, setIsOpen }: Props) => {
  const groupId = useParams().id
  const groups = useSelector((state: RootState) => state.group.groups)
  const [currentGroup, setCurrentGroup] = useState<Group>()
  const user = useSelector((state: RootState) => state.user)
  const [cashPayment, setCashPayment] = useState(false)
  const [totalAmount, setTotalAmount] = useState<number>()
  const [userId1, setUserId1] = useState<number>()
  const [userId2, setUserId2] = useState<number>(user.user_id)
  const axiosInstance = useAxiosInstance()

  //   useEffect(() => {
  //     if (groups.length > 0 && groupId === undefined)
  //       setGroupId(groups[0].group_id)
  //   }, [])

  useEffect(() => {
    setUserId1(
      currentGroup?.members.find((m) => m.user_id !== user.user_id)?.user_id
    )
  }, [currentGroup])

  useEffect(() => {
    groupId && setCurrentGroup(groups.find((g) => g.group_id === +groupId))
  }, [groupId])
  useEffect(() => {
    console.log({ userId1, userId2 })
  }, [userId1, userId2])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const data = {
      expense: {
        amount: totalAmount,
        paid_by_id: userId1,
        category: 'individual',
        members: [
          {
            user_id: userId1,
            owed: totalAmount,
          },
          {
            user_id: userId2,
            owed: 0,
          },
        ],
      },
    }
    console.log(data)
    try {
      if (cashPayment) {
        if (!totalAmount && totalAmount === 0)
          return toastify('Amount cant be 0', 'error')
        if (totalAmount! < 0)
          return toastify('Amount cant be negative', 'error')
        await axiosInstance.post(`/groups/${groupId}/expenses`, data)
        setTotalAmount(0)
        setCashPayment(false)
      } else {
        await axiosInstance.put(`/groups/${groupId}/settleup`)
      }
      setIsOpen(false)
      toastify('Settled up', 'success')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Modal
      open={isSettleUpOpen}
      onClose={() => {
        setIsOpen(false)
        setCashPayment(false)
        setTotalAmount(0)
      }}
      title="Settle up"
      className="pb-6"
      double
    >
      <form onSubmit={handleSubmit}>
        <div className="flex pt-10 justify-center">
          <div
            className={classNames(
              'flex flex-col items-center px-8 py-7 gap-4',
              cashPayment && 'hidden'
            )}
          >
            <span>Choose a payment method</span>
            <button
              className="bg-primary px-6 py-3 rounded-md text-lg tracking-wider hover:bg-[#584CAC] transition-all outline-none focus:bg-[#584CAC]"
              onClick={() => setCashPayment((c) => !c)}
              type="button"
            >
              Record a cash payment
            </button>
          </div>
          <div
            className={classNames(
              'px-4 py-4 flex flex-col gap-4',
              !cashPayment && 'hidden'
            )}
          >
            <div className="flex w-full justify-around items-center px-8">
              <img src={avatar} alt="avatar" className="h-12" />
              <HiArrowRight className="text-3xl" />
              <img src={avatar} alt="avatar" className="h-12" />
            </div>
            <div className="flex w-full justify-around items-center px-8 gap-4">
              <select
                className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
                value={userId1}
                onChange={(e) => setUserId1(+e.target.value)}
              >
                {currentGroup?.members?.map((m) => (
                  <option key={m.user_id} value={m.user_id}>
                    {user.user_id === m.user_id ? 'you' : m.name}
                  </option>
                ))}
              </select>

              <select
                className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
                value={userId2}
                onChange={(e) => setUserId2(+e.target.value)}
              >
                {currentGroup?.members?.map((m) => (
                  <option key={m.user_id} value={m.user_id}>
                    {user.user_id === m.user_id ? 'you' : m.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end px-16">
              <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="bg-[#242731] outline-none text-4xl max-w-[100px] overflow-hidden w-fit border-b border-icon"
                onWheel={(e) => e.currentTarget.blur()}
                value={totalAmount}
                onChange={(e) => setTotalAmount(+e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            className="flex items-center py-3 px-5 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg text-md"
            onClick={() => {
              setIsOpen(false)
              setCashPayment(false)
              setTotalAmount(0)
            }}
          >
            Cancel
          </button>
          <button
            className="flex items-center py-3 px-5 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-md"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default SettleUp
