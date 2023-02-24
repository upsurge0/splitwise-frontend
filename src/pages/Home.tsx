import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import TotalBalances from '../components/TotalBalances'
import Summary from '../components/Summary'
import FAB from '../components/FAB'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar />
        <TotalBalances />
        <Summary />
      </div>
      <FAB />
    </div>
  )
}

export default Home
