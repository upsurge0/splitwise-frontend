import { useState } from 'react'
import avatar from '../assets/avatar.svg'

type MemberProps = {
  email: string
}

const AddMember = ({ email }: MemberProps) => {
  return (
    <div className="flex gap-4">
      <img src={avatar} alt="avatar" className="h-10" />
      <input
        className="px-4 py-2 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
        type="text"
        placeholder="Email"
      />
    </div>
  )
}

const AddGroup = () => {
  const [members, setMembers] = useState([
    {
      email: '',
    },
  ])

  const handleAddMember = () => {
    setMembers((member) => [...member, { email: ''}])
  }

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col px-4 py-4 pt-8 md:px-16 gap-8 max-w-[700px] mx-auto">
        <h1 className="text-lg">START A NEW GROUP</h1>
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-medium tracking-wide">
            My group shall be called
          </span>
          <input
            className="px-6 py-4 rounded-md bg-secondaryBackground focus:outline-primary outline-none max-w-[580px]"
            type="text"
            placeholder="Group Name"
          />
        </div>
        <div>
          <span className="text-lg">GROUP MEMBERS</span>
          <div className="flex flex-col pt-4 gap-6">

            {members.map((m) => (
              <AddMember email={m.email} />
            ))}
            <button className="flex items-center gap-4 hover:underline w-fit" onClick={handleAddMember}>
              + Add a person
            </button>
          </div>
        </div>
        <button className="flex items-center py-3 px-6 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-lg w-fit">
          Save
        </button>
      </div>
    </div>
  )
}

export default AddGroup
