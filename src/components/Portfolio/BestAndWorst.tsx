interface BestAndWorstProps {
  largestProfit: number;
  averageProfit: number;
  largestLoss: number;
  averageLoss: number;
}

const BestAndWorst = ({
  largestProfit,
  averageProfit,
  largestLoss,
  averageLoss,
}: BestAndWorstProps) => {
  return (
    <div className=" tw:w-full tw:py-3 tw:px-4 tw:rounded-lg tw:flex tw:flex-col tw:items-start tw:justify-start tw:bg-black-200">
      <div className="tw:text-white tw:text-sm tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2 tw:font-medium tw:leading-6">
        Best & Worst
      </div>
      <div className="tw:w-full tw:grid tw:grid-cols-2 tw:md:grid-cols-5">
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start tw:lg:col-span-2">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Largest Profit
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-profit">
            ${largestProfit}
          </div>
        </div>

        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Average Profit
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-profit">
            ${averageProfit}
          </div>
        </div>
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Largest Loss
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-loss">
            ${largestLoss}
          </div>
        </div>
        <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
          <div className="tw:py-2 tw:text-gray-100 tw:font-medium tw:text-sm tw:h-9 tw:flex tw:flex-row tw:items-start tw:justify-center">
            Average Loss
          </div>
          <div className="tw:text-sm tw:font-semibold tw:text-loss">
            ${averageLoss}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestAndWorst;
