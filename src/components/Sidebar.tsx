import logo from '../assets/logo.svg'
import { FiHome } from 'react-icons/fi'
import { BiGroup, BiUser } from 'react-icons/bi'
import { IconContext } from 'react-icons'

type Props = {}

const Sidebar = (props: Props) => {
  const items = [
    {
      icon: <FiHome />,
      title: 'Home',
    },
    {
      icon: <BiGroup />,
      title: 'Groups',
    },
    {
      icon: <BiUser />,
      title: 'Friends',
    },
  ]

  return (
    <div className="hidden md:flex">
      <div className="flex flex-col px-2 h-screen py-10 max-w-[350px]">
        <div className="flex items-center mx-auto gap-4">
          <img className="w-16" src={logo} alt="splitwise" />
          <span className="text-3xl">SplitWise</span>
        </div>
        <div className="flex flex-col gap-8 pt-16 mx-auto">
          {items.map((i, id) => (
            <div
              className="flex items-center px-8 pr-28 py-5 rounded-lg gap-6 text-2xl cursor-pointer hover:bg-[#282b36]"
              key={id}
            >
              <IconContext.Provider value={{ color: '#808191' }}>
                {i.icon}
              </IconContext.Provider>
              <div>{i.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-l-[1px] h-screen border-divider" />
    </div>
  )
}

export default Sidebar
