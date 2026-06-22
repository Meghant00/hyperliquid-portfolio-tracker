import type { ActivelyTradedCoin } from "../../../utils/tradeDistribution";

const MostActivelyTradedCoin = ({
  activelyTradedCoin,
}: {
  activelyTradedCoin: ActivelyTradedCoin;
}) => {
  return (
    <div className="tw:w-fit tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-base tw:font-medium tw:text-gray-100">
        Most Actively Traded Coin
      </div>
      <div className="tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2">
        <img
          src={activelyTradedCoin.image}
          alt={activelyTradedCoin.coin}
          className="tw:size-8 tw:rounded-full"
        />
        <h3 className="tw:text-white tw:text-lg tw:font-semibold">
          {activelyTradedCoin.coin}
        </h3>
      </div>
    </div>
  );
};

export default MostActivelyTradedCoin;
