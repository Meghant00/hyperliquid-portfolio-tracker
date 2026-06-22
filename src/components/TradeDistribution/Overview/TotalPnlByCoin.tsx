import { formatDecimals } from "../../../utils/number";

const TotalPnlByCoin = ({
  totalPnlInNumber,
  coin,
}: {
  totalPnlInNumber: number;
  coin: string;
}) => {
  const totalPnl = formatDecimals(totalPnlInNumber);

  return (
    <div className="tw:w-full tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-gray-100">
        Total {coin} PnL
      </div>
      <div
        className={`tw:text-3xl ${totalPnlInNumber < 0 ? "tw:text-loss" : "tw:text-profit"}`}
      >
        ${totalPnl}
      </div>
    </div>
  );
};

export default TotalPnlByCoin;
