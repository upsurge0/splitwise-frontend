import React from 'react'

type Props = {}

const TotalBalances = (props: Props) => {
  return (
    <div className="flex justify-between px-4 md:px-16">
      <div className="flex flex-col items-center">
        <span>total balance</span>
        <span className="text-green">+ $2.6</span>
      </div>
      <div className="border-l border-divider" />
      <div className="flex flex-col items-center">
        <span>you owe</span>
        <span>$0</span>
      </div>
      <div className="border-l border-divider" />
      <div className="flex flex-col items-center">
        <span>you are owed</span>
        <span className="text-green">+ $2.6</span>
      </div>
    </div>
  )
}

export default TotalBalances
