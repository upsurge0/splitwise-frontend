import { CgNotes } from 'react-icons/cg'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import _ from 'lodash-es'
import Scrollbar from 'smooth-scrollbar'
import SplitCard from './SplitCard'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddExpense = ({ isOpen: isAddExpenseOpen, setIsOpen }: Props) => {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [splitType, setSplitType] = useState('equal')

  const [isSplitOptionsOpen, setIsSplitOptionsOpen] = useState(false)

  useEffect(() => {
    const doc = document.querySelector('#scrollable-3')
    doc &&
      Scrollbar.init(doc, {
        alwaysShowTracks: true,
      })
  }, [isSplitOptionsOpen])

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
        <div className="flex pt-10">
          <div className="bg-[#2f3044] px-4 py-4 text-8xl rounded-lg">
            <CgNotes />
          </div>
          <div className="px-4 py-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter a Description"
              className="bg-[#242731] outline-none text-lg"
            />
            <div className="flex items-end">
              <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>
              <input
                type="number"
                placeholder="0.00"
                className="bg-[#242731] outline-none text-4xl max-w-[200px] overflow-hidden w-fit"
                onWheel={(e) => e.currentTarget.blur()}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 tracking-wider`">
          <span>
            with you and{' '}
            <button className="bg-[#2f3044] hover:bg-[#4d4a64] rounded-xl px-2 text-primary">
              group-name
            </button>
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
          <button className="flex items-center py-3 px-5 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-md">
            Save
          </button>
        </div>
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
            name="pets"
            id="pet-select"
            className="bg-[#2f3044] cursor-pointer px-4 py-2 outline-none"
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
          >
            <option value="equal">Equally</option>
            <option value="exact">Exact Amounts</option>
            <option value="percentages">Percentages</option>
            <option value="shares">Shares</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="flex flex-col max-h-[144px] gap-4" id="scrollable-3">
            {splitType === 'equal' ? (
              <div>
                <SplitCard key={1} type="equal" />
                <SplitCard key={2} type="equal" />
                <SplitCard key={2} type="equal" />
              </div>
            ) : splitType === 'exact' ? (
              <div>
                <SplitCard key={3} type="exact" />
              </div>
            ) : splitType === 'percentages' ? (
              <div>
                <SplitCard key={4} type="percentages" />
              </div>
            ) : (
              splitType === 'shares' && (
                <div>
                  <SplitCard key={5} type="shares" />
                </div>
              )
            )}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddExpense
