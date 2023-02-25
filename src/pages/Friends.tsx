import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import FAB from '../components/FAB'

type Props = {}

const Friends = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title='Friends'/>
      </div>
      <FAB />
    </div>
  )
}

export default Friends
