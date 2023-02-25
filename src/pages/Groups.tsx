import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import FAB from '../components/FAB'

type Props = {}

const Groups = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title='Groups'/>
      </div>
      <FAB />
    </div>
  )
}

export default Groups
