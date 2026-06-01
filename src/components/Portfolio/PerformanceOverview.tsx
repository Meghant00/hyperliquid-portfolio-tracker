interface PerformanceOverviewProps {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
}

const PerformanceOverview = ({
  totalTrades,
  wins,
  losses,
  winRate,
}: PerformanceOverviewProps) => {
  return (
    <div className=" tw:w-full tw:py-3 tw:px-4 tw:rounded-lg tw:flex tw:flex-col tw:items-start tw:justify-start tw:bg-black-200">
      <div className="tw:text-white tw:text-sm tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2 tw:font-medium tw:leading-6">
        Performance Overview
      </div>
      <div className="tw:w-full tw:grid tw:grid-cols-2 tw:md:grid-cols-5">
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start tw:lg:col-span-2">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Total Trades
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-white">
            {totalTrades}
          </div>
        </div>

        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Wins
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-white">
            {wins}
          </div>
        </div>
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Losses
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-white">
            {losses}
          </div>
        </div>
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Win Rate
          </div>
          <div
            className={`tw:text-sm tw:font-semibold ${winRate >= 50 ? "tw:text-profit" : "tw:text-loss"}`}
          >
            {winRate}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverview;
