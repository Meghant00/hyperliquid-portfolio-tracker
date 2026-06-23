import { formatDecimals } from "../../../utils/number";

const LargestPnlByCoin = ({
  totalPnlInNumber,
  coin,
  isProfit = true,
}: {
  totalPnlInNumber: number;
  coin: string;
  isProfit?: boolean;
}) => {
  const totalPnl = formatDecimals(totalPnlInNumber);

  return (
    <div className="tw:w-full tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-gray-100">
        Largest {coin} {isProfit ? "Profit" : "Loss"}
      </div>
      <div
        className={`tw:text-3xl ${totalPnlInNumber < 0 ? "tw:text-loss" : "tw:text-profit"}`}
      >
        ${totalPnl}
      </div>
    </div>
  );
};

export default LargestPnlByCoin;
