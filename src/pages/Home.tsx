import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import TotalBalances from '../components/TotalBalances'
import Summary from '../components/Summary'
import FAB from '../components/FAB'
import useIsLoggedIn from '../utils/useIsLoggedIn'

type Props = {}

const Home = (props: Props) => {
  useIsLoggedIn()
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar title='Home' />
        <TotalBalances />
        <Summary />
      </div>
      <FAB />
    </div>
  )
}

export default Home
