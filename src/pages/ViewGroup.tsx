import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FAB from '../components/FAB'
import GroupItem from '../components/GroupItem'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import Transaction from '../components/Transaction'
import { Group } from '../utils/types'
import { useAxiosInstance } from '../utils/useAxiosInstance'

type Props = {}

const ViewGroup = (props: Props) => {
  const params = useParams()
  const axiosInstance = useAxiosInstance()
  const [group, setGroup] = useState<Group[]>()

  console.log(params)

  const fetchGroup = async () => {
    try {
      const res = await axiosInstance.get(`/groups/${params.id}`)
      console.log(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchGroup()
  }, [params])

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title="Groups" />
        <div className="flex flex-col px-4 md:px-12  gap-1 ">
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1">
            <Transaction />
          </div>
        </div>
      </div>
      <FAB />
    </div>
  )
}

export default ViewGroup
