import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FAB from '../components/FAB'
import GroupItem from '../components/GroupItem'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Transaction from '../components/Transaction'
import { Expense, Group } from '../utils/types'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import useIsLoggedIn from '../utils/useIsLoggedIn'
import avatar from '../assets/avatar.svg'

type Props = {}

const ViewGroup = (props: Props) => {
  const params = useParams()
  const axiosInstance = useAxiosInstance()
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [group, setGroup] = useState<Group>()
  useIsLoggedIn()

  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${params.id}/expenses`)
      setExpenses(res.data.expenses)
    } catch (e) {
      console.log(e)
    }
  }

  const fetchGroup = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${params.id}`)
      setGroup(res.data.group)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchExpenses()
    fetchGroup()
  }, [params])

  useEffect(() => {
    console.log({ expenses, group })
  }, [expenses, group])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title="Groups" />
        <div className="flex flex-col px-4 md:px-12 ">
          <div className="flex">
            <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1 flex flex-1 flex-col gap-2  ">
              {expenses?.reverse().map((e, i) => {
                const odd = i % 2 === 0
                return <Transaction even={odd} expense={e} />
              })}
            </div>

            <div className="px-4 flex flex-col gap-4">
              <span className="text-gray-300">GROUP BALANCES</span>

              <div className="flex flex-col gap-4">
                {group?.members?.map((m) => (
                  <div className="flex items-center gap-4 hover:bg-[#25272e] px-4 py-2 rounded-lg cursor-pointer">
                    <img src={avatar} alt="avatar" className="h-12" />
                    <div className="flex flex-col">
                      <span>{m.name}</span>
                      {m.total_balance && m.total_balance < 0 ? (
                        <span className='text-red'>owes {Math.abs(m.total_balance)}</span>
                      ) : (
                        <span className='text-green'>gets back {m.total_balance}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAB fetch={fetchExpenses} />
    </div>
  )
}

export default ViewGroup
