import avatar from '../assets/avatar.svg'

type Props = {
  type: "equal" | "exact" | "percentages" | "shares"
}

const SplitCard = ({type}: Props) => {
  return (
    <div className="flex items-center gap-6 py-3 px-4 rounded-lg">
      <img className="h-12" src={avatar} alt="" />
      <div className="flex flex-col flex-1">
        <span className="text-lg">Kristin Watson</span>
      </div>
      <div className="flex items-end">
      {(type === 'equal' || type === 'exact') && <span className="pb-0.5 pr-1 text-[#9ca3af]">$</span>}
        <input
          type="number"
          placeholder={(type === 'equal' || type === 'exact') ? "0.00" : "      0"}
          className="bg-[#242731] outline-none text-xl max-w-[50px] overflow-hidden shadow-md border-b border-icon"
          onWheel={(e) => e.currentTarget.blur()}
          disabled={type === 'equal'}
        />
        {(type === 'percentages' || type === 'shares') && <span className="pb-0.5 pr-1 text-[#9ca3af]">
          {type === 'percentages' ? '%' : 'shares' }
          </span>}
      </div>
    </div>
  )
}

export default SplitCard
