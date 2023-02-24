import React from 'react'
import avatar from '../assets/avatar.svg'

type Props = {}

const Topbar = (props: Props) => {
  return (
    <div className="flex items-center justify-between h-fit px-4 md:px-16 py-11">
      <span className="text-3xl">Home</span>
      <img className="h-12" src={avatar} alt="avatar" />
    </div>
  )
}

export default Topbar
