import classNames from 'classnames'
import { BiGroup } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import avatar from '../assets/avatar.svg'

type Props = {
  even?: boolean
  name: string
  type?: 'regular' | 'friend'
  groupId: number
}

const GroupItem = ({ name, even = false, type = 'regular', groupId }: Props) => {
  return (
    <Link to={type === 'regular' ? `/groups/${groupId}` : '/friends'}
      className={classNames(
        'flex items-center gap-4 justify-between px-4 md:px-8 py-6 rounded-lg hover:outline-primary outline-none cursor-pointer',
        even ? 'bg-[#25272e]' : 'border-divider border'
      )}
    >
      <div className="flex items-center gap-4">
        {type === 'regular' ? (
          <BiGroup className="text-4xl" />
        ) : (
          <img className="h-10" src={avatar} alt="avatar" />
        )}
        <h2 className="text-xl">{name}</h2>
      </div>
      <span className="text-red invisible">you owe $1.4</span>
    </Link>
  )
}

export default GroupItem
