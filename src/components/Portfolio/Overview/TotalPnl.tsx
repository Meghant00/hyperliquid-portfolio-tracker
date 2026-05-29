import { formatDecimals } from "../../../utils/number";

const TotalPnl = ({ totalPnlInNumber }: { totalPnlInNumber: number }) => {
  const totalPnl = formatDecimals(totalPnlInNumber);

  return (
    <div className="tw:w-full tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-gray-100">
        Total PnL
      </div>
      <div className="tw:text-white tw:text-3xl">${totalPnl}</div>
    </div>
  );
};

export default TotalPnl;
