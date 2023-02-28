import { FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuid } from 'uuid'
import AddMember from '../components/AddMember'
import { RootState } from '../redux/store'
import { toastify } from '../utils/notifications'
import { User } from '../utils/types'
import { useAxiosInstance } from '../utils/useAxiosInstance'
import useIsLoggedIn from '../utils/useIsLoggedIn'

const AddGroup = () => {
  const [groupName, setGroupName] = useState('')
  const [members, setMembers] = useState([
    {
      email: '',
      userNotFound: false,
      id: uuid(),
    },
  ])
  const [users, setUsers] = useState<User[]>([])
  const axiosInstance = useAxiosInstance()
  const userState = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()

  useIsLoggedIn()

  const handleEmail = (id: string, email: string) => {
    setMembers((members) =>
      members.map((m) => {
        if (m.id === id) return { ...m, email }
        return m
      })
    )
  }

  const handleAddMember = () => {
    setMembers((member) => [
      ...member,
      { email: '', userNotFound: false, id: uuid() },
    ])
  }

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/users')
      setUsers(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const checkUsers = () => {
    const commonUsers = users.filter((u) =>
      members.some(({ email }) => u.email === email)
    )

    // setMembers((mem) =>
    //   mem.map((m) => {
    //     return { ...m, userNotFound: false }
    //   })
    // )
    members.filter((u) => {
      const check =
        u.email !== '' && !users.some(({ email }) => u.email === email)
      if (check)
        setMembers((mem) =>
          mem.map((m) => {
            if (m.id === u.id) return { ...m, userNotFound: true }
            return m
          })
        )
      return check
    })

    return commonUsers
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const commonUsers = checkUsers()
    let temp = false
    members.forEach(m => {
      if(m.userNotFound){
        temp = true
        return
      }
    })
    console.log({members, temp})
    if (commonUsers.length === 0) return
    const ids = commonUsers.map((c) => {
      // @ts-ignore
      return c.user_id
    })

    const data = {
      group: {
        name: groupName,
        user_ids: ids,
      },
    }
    console.log({ data, commonUsers, ids })

    try {
      const res = await axiosInstance.post('/groups', data)
      navigate('/groups')
      toastify('Group created', 'success')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="w-full h-screen">
      <form
        className="flex flex-col px-4 py-4 pt-8 md:px-16 gap-8 max-w-[700px] mx-auto"
        onSubmit={handleSubmit}
      >
        <h1 className="text-lg">START A NEW GROUP</h1>
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-medium tracking-wide">
            My group shall be called
          </span>
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none max-w-[580px]"
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div>
          <span className="text-lg">GROUP MEMBERS</span>
          <div className="flex flex-col pt-4 gap-6">
            {members.map((m) => (
              <AddMember
                email={m.email}
                userNotFound={m.userNotFound}
                setEmail={handleEmail}
                key={m.id}
                id={m.id}
              />
            ))}
            <a
              className="flex items-center gap-4 hover:underline w-fit cursor-pointer"
              onClick={handleAddMember}
            >
              + Add a person
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="flex items-center py-3 px-6 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-lg w-fit"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default AddGroup
