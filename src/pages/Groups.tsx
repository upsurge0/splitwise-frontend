import { useEffect, useState } from 'react'
import FAB from '../components/FAB'
import GroupItem from '../components/GroupItem'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import useIsLoggedIn from '../utils/useIsLoggedIn'
import { Group } from '../utils/types'

const Groups = () => {
  const axiosInstance = useAxiosInstance()
  const [groups, setGroups] = useState<Group[]>([])

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get('/groups')
      setGroups((res.data as Group[]).filter((g) => g.type === 'regular'))
    } catch (e) {}
  }

  useEffect(() => {
    fetchGroups()
    console.log(groups)
  }, [])

  useIsLoggedIn()
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title="Groups" />
        <div className="flex flex-col px-4 md:px-12  gap-1 ">
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 pt-1">
            {groups.map((g, i) => {
              let even = false
              if (i % 2 !== 0) even = true
              return <GroupItem name={g.name} even={even} />
            })}
          </div>
        </div>
      </div>
      <FAB />
    </div>
  )
}

export default Groups
