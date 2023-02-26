import { useEffect, useRef } from 'react'
import UserCard from './UserCard'
import Scrollbar from 'smooth-scrollbar'

type Props = {}

const Summary = (props: Props) => {
  useEffect(() => {
    Scrollbar.init(document.querySelector('#scrollable-1')!, {
      alwaysShowTracks: true,
    })
    Scrollbar.init(document.querySelector('#scrollable-2')!, {
      alwaysShowTracks: true,
    })
  }, [])

  return (
    <div className="flex px-4 md:px-16">
      <div className="w-full">
        <h1 className="text-2xl pt-8 pb-6">You owe</h1>
        <div className="pr-4 max-h-[368px] overflow-auto" id="scrollable-1">
          <UserCard negative={true} />
        </div>
      </div>
      <div className="pt-[5.5rem]">
        <div className="border-l border-divider h-[370px] self-end" />
      </div>
      <div className="w-full">
        <h1 className="text-2xl px-4 pt-8 pb-6">You are owed</h1>
        <div className="px-4 max-h-[368px] overflow-auto" id="scrollable-2">
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </div>
      </div>
    </div>
  )
}

export default Summary
