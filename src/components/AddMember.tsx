import classNames from 'classnames'
import avatar from '../assets/avatar.svg'

type MemberProps = {
  email: string
  setEmail: (id: string, e: string) => void
  id: string
  userNotFound: boolean
}

const AddMember = ({ id, email, setEmail, userNotFound }: MemberProps) => {
  return (
    <div className="flex items-center gap-4">
      <img src={avatar} alt="avatar" className="h-10" />
      <input
        className="px-4 py-2 rounded-md bg-secondaryBackground focus:outline-primary outline-none"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(id, e.target.value)}
      />
      <div className={classNames('text-red', !userNotFound && 'invisible')}>User not found</div>
    </div>
  )
}

export default AddMember
