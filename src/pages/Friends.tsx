import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import FAB from '../components/FAB'
import useIsLoggedIn from '../utils/useIsLoggedIn'
import { useEffect, useState } from 'react'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import GroupItem from '../components/GroupItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Group } from '../utils/types'
import { setGroups } from '../redux/group'

type Props = {}

const Friends = (props: Props) => {
  const axiosInstance = useAxiosInstance()
  const groups = useSelector((state: RootState) => state.group.groups)
  const dispatch = useDispatch()
  const user = useSelector((state:RootState) => state.user)

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get('/groups')
      dispatch(setGroups((res.data as Group[])))
    } catch (e) {}
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useIsLoggedIn()
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title='Friends'/>
        <div className="flex flex-col px-4 md:px-12  gap-1 ">
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 py-1 flex flex-col gap-2">
            {groups.filter(g => g.type !== 'regular').map((g, i) => {
              let even = false
              if (i % 2 === 0) even = true
              const friendName = g.members.filter(m => m.user_id !== user.user_id)[0].name
              return <GroupItem name={friendName} even={even} type='friend' key={g.group_id} groupId={g.group_id} />
            })}
          </div>
        </div>
      </div>
      <FAB />
    </div>
  )
}

export default Friends
