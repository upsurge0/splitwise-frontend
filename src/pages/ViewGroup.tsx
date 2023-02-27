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
  const [loading, setLoading] = useState(true)
  const [simplify, setSimplify] = useState(false)

  useIsLoggedIn()

  const fetchExpenses = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${params.id}/expenses`)
      setExpenses(res.data.expenses.reverse())
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

  const fetch = async () => {
    await fetchExpenses()
    await fetchGroup()
    setLoading(false)
  }

  const toggleSimplify = async () => {
    const data = {
      group: {
        simplify: !simplify,
      },
    }

    try {
      const res = await axiosInstance.put(`/groups/${params.id}`, data)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetch()
  }, [params])

  useEffect(() => {
    console.log({ expenses, group })
  }, [expenses, group])
  useEffect(() => {
    if (group?.simplify) setSimplify(group?.simplify)
  }, [group])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title="Groups" />
        <div className="flex flex-col px-4 md:px-12 ">
          <div className="flex divide-x divide-divider">
            <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1 flex flex-1 flex-col gap-2  ">
              {loading ? (
                <span className="flex min-h-[400px] flex-1 items-center justify-center text-xl">
                  Loading...
                </span>
              ) : expenses.length > 0 ? (
                expenses?.map((e, i) => {
                  const odd = i % 2 === 0
                  return <Transaction even={odd} expense={e} />
                })
              ) : (
                <span className="flex min-h-[400px] flex-1 items-center justify-center text-xl">
                  No transactions yet! Click add expense to create one.
                </span>
              )}
            </div>

            <div className="px-4">
              <div className="flex flex-col gap-4">
                <span className="text-gray-300">GROUP BALANCES</span>
                <div className="flex flex-col gap-4 min-w-[184px] h-[320px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg py-1">
                  {group?.members?.map((m) => (
                    <div className="flex items-center gap-4 hover:bg-[#25272e] px-4 py-2 rounded-lg cursor-pointer">
                      <img src={avatar} alt="avatar" className="h-12" />
                      <div className="flex flex-col">
                        <span>{m.name}</span>
                        {m.total_balance && m.total_balance < 0 ? (
                          <span className="text-red">
                            owes {Math.abs(m.total_balance)}
                          </span>
                        ) : (
                          <span className="text-green">
                            gets back {m.total_balance}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-gray-300">GROUP DETAILS</span>
                <div className="flex flex-col gap-2">
                  <span className="text-xl">{group?.name}</span>
                  <div className="flex">
                    <div onClick={toggleSimplify}>
                      <input
                        className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[rgba(0,0,0,0.25)] outline-icon outline-none before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                        type="checkbox"
                        role="switch"
                        id="simplify"
                        checked={simplify}
                        onChange={() => setSimplify((s) => !s)}
                      />
                      <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="simplify"
                      >
                        Simplify debts
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FAB
        fetch={() => {
          fetchExpenses()
          fetchGroup()
        }}
      />
    </div>
  )
}

export default ViewGroup
