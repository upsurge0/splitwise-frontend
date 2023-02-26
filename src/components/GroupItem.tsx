import classNames from 'classnames'
import { BiGroup } from 'react-icons/bi'
import avatar from '../assets/avatar.svg'

type Props = {
  even?: boolean
  name: string
  type?: 'regular' | 'friend'
}

const GroupItem = ({ name, even = false, type = 'regular' }: Props) => {
  return (
    <div
      className={classNames(
        'flex items-center gap-4 justify-between px-4 py-6 rounded-lg hover:outline-primary outline-none cursor-pointer',
        even && 'bg-[#25272e]'
      )}
    >
      <div className="flex items-center gap-4">
        {type === 'regular' ? (
          <BiGroup className="text-4xl" />
        ) : (
          <img className="h-12" src={avatar} alt="avatar" />
        )}
        <h2 className="text-lg">{name}</h2>
      </div>
      <span className="text-red invisible">you owe $1.4</span>
    </div>
  )
}

export default GroupItem
