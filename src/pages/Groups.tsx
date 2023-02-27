import { useEffect, useState } from 'react'
import FAB from '../components/FAB'
import GroupItem from '../components/GroupItem'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import useIsLoggedIn from '../utils/useIsLoggedIn'
import { Group } from '../utils/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setGroups } from '../redux/group'

const Groups = () => {
  const axiosInstance = useAxiosInstance()
  const groups = useSelector((state: RootState) => state.group.groups)
  const dispatch = useDispatch()

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get('/groups')
      dispatch(setGroups((res.data as Group[])))
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
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1">
            {groups.filter(g => g.type !== 'friend').map((g, i) => {
              let even = false
              if (i % 2 === 0) even = true
              return <GroupItem name={g.name!} even={even} key={g.group_id} groupId={g.group_id} />
            })}
          </div>
        </div>
      </div>
      <FAB />
    </div>
  )
}

export default Groups
