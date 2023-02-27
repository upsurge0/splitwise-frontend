import Modal from './Modal'
import avatar from '../assets/avatar.svg'
import { HiArrowRight } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SettleUp = ({ isOpen: isSettleUpOpen, setIsOpen }: Props) => {
  const [groupId, setGroupId] = useState<number>()
  const groups = useSelector((state: RootState) => state.group.groups)
  const user = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (groups.length > 0 && groupId === undefined)
      setGroupId(groups[0].group_id)
  }, [])
  useEffect(() => {
    console.log({groupId})
  }, [groupId])

  return (
    <Modal
      open={isSettleUpOpen}
      onClose={() => {
        setIsOpen(false)
      }}
      title="Settle up"
      className="pb-6"
      double
    >
      <form>
        <div className="flex pt-10 justify-center">
          <div className="px-4 py-4 flex flex-col gap-4">
            <div className="flex w-full justify-around items-center px-8">
              <img src={avatar} alt="avatar" className="h-12" />
              <HiArrowRight className="text-3xl" />
              <img src={avatar} alt="avatar" className="h-12" />
            </div>
            <div className="flex w-full justify-around items-center px-8">
              <select
                className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
                value={groupId}
                onChange={(e) => setGroupId(+e.target.value)}
              >
                {groups.map((g) => (
                  <option key={g.group_id} value={g.group_id}>
                    {g.name ?? g.members.find(m => m.user_id !== user.user_id)?.name}
                  </option>
                ))}
              </select>
              <span>user</span>
            </div>
            <div className="flex items-end px-16">
              <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="bg-[#242731] outline-none text-4xl max-w-[100px] overflow-hidden w-fit"
                onWheel={(e) => e.currentTarget.blur()}
                //   value={totalAmount}
                //   onChange={(e) => setTotalAmount(+e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          <button
            className="flex items-center py-3 px-5 gap-4 bg-[#4d4a64] hover:bg-[#434462] rounded-lg text-md"
            onClick={() => setIsOpen(false)}
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
