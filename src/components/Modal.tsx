import cn from 'classnames'
import React from 'react'
import ReactDOM from 'react-dom'
import { IoClose } from 'react-icons/io5'

type Props = {
  children: React.ReactNode
  open: boolean
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined
  title?: string
  double?: boolean
  className?: React.ComponentProps<'div'>['className'];
}

const Modal = ({ children, open, onClose, title, double = false, className }: Props) => {
  if (!open) return null

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000050]" />

      <div
        className={cn(
          double ? 'top-[30%]' : 'top-[50%]',
          'fixed left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#242731] pt-10 px-8 z-[1000] rounded-lg', className
        )}
      >
        {title && (
          <span className="absolute top-4 left-8 text-2xl tracking-wider">
            {title}
          </span>
        )}
        <button
          className="absolute top-4 right-8 p-2 rounded-full text-2xl hover:bg-[#2f3044]"
          onClick={onClose}
        >
          <IoClose />
        </button>
        {children}
      </div>
    </>,
    document.getElementById('portal')!
  )
}

export default Modal
