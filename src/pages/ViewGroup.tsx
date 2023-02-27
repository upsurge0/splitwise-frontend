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

type Props = {}

const ViewGroup = (props: Props) => {
  const params = useParams()
  const axiosInstance = useAxiosInstance()
  const [expenses, setExpenses] = useState<Expense[]>([])
  useIsLoggedIn()

  console.log(params)

  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${params.id}/expenses`)
      setExpenses(res.data.expenses)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [params])
  useEffect(() => {
    console.log(expenses)
  }, [expenses])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title="Groups" />
        <div className="flex flex-col px-4 md:px-12 ">
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1 flex flex-col gap-2  ">
            {expenses?.reverse().map((e, i) => {
              const odd = i % 2 === 0
              return <Transaction even={odd} expense={e} />
            })}
          </div>
        </div>
      </div>
      <FAB fetch={fetchExpenses}/>
    </div>
  )
}

export default ViewGroup
