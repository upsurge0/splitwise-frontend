import React from 'react'
import avatar from '../assets/avatar.svg'
import { BiLogOutCircle } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/user'

type Props = {
  title: string
}

const Topbar = ({ title }: Props) => {
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-between h-fit px-4 md:px-16 py-11">
      <span className="text-3xl">{title}</span>
      {/* <div>
        <img className="h-12" src={avatar} alt="avatar" />
      </div> */}
      <div className="flex flex-col items-end relative">
        <img
          className="peer h-16 p-2 cursor-pointer"
          src={avatar}
          alt="avatar"
        />

        <div
          className="absolute bottom-[-55px] right-[-35px] invisible peer-hover:visible hover:visible
         w-fit flex flex-col"
        >
          <button
            className="bg-[#2f3044] px-4 py-4 rounded-lg flex items-center gap-4 w-[150px] hover:bg-[#434462]"
            onClick={() => dispatch(logout())}
          >
            <BiLogOutCircle className="text-lg" /> Log out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
