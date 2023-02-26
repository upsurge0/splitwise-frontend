import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import FAB from '../components/FAB'
import useIsLoggedIn from '../utils/useIsLoggedIn'
import { useEffect, useState } from 'react'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import GroupItem from '../components/GroupItem'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Group } from '../utils/types'

type Props = {}

const Friends = (props: Props) => {
  const axiosInstance = useAxiosInstance()
  const [friends, setFriends] = useState<Group[]>([])
  const user = useSelector((state:RootState) => state.user)

  const fetchGroups = async () => {
    try {
      const res = await axiosInstance.get('/groups')
      setFriends((res.data as Group[]).filter((g) => g.type === 'friend'))
    } catch (e) {}
  }

  useEffect(() => {
    fetchGroups()
    console.log(friends)
  }, [])

  useIsLoggedIn()
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title='Friends'/>
        <div className="flex flex-col px-4 md:px-12  gap-1 ">
          <div className="max-h-[440px] scrollbar-thin scrollbar-thumb-[#808191] scrollbar-track-blue-[#1f2128] scrollbar-thumb-rounded-lg px-4 pt-1">
            {friends.map((g, i) => {
              let even = false
              if (i % 2 !== 0) even = true
              const friendName = g.members.filter(m => m.user_id !== user.user_id)[0].name
              return <GroupItem name={friendName} even={even} type='friend' />
            })}
          </div>
        </div>
      </div>
      <FAB />
    </div>
  )
}

export default Friends
