import avatar from '../assets/avatar.svg'
import classnames from 'classnames'

type Props = {
  negative?: boolean
}

const UserCard = ({negative=false}: Props) => {
  return (
    <div className="flex items-center gap-6 py-5 px-4 hover:bg-secondaryBackground cursor-pointer rounded-lg">
      <img className="h-12" src={avatar} alt="" />
      <div className="flex flex-col">
        <span className="text-lg">Kristin Watson</span>
        <span className={classnames(negative ? 'text-red' : 'text-green')}>{negative ? 'you owe' : 'you are owed'} $1.4</span>
      </div>
    </div>
  )
}

export default UserCard
