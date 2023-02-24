import React from 'react'
import { CgNotes } from 'react-icons/cg'

type Props = {}

const FAB = (props: Props) => {
  return (
    <div className="absolute bottom-4 right-4 md:right-16">
      <button className="flex items-center py-3 px-6 gap-4 bg-primary hover:bg-[#584cac] rounded-lg text-lg">
        <CgNotes />
        Add expense
      </button>
    </div>
  )
}

export default FAB
