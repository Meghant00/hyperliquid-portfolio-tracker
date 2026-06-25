import type { TradedCoin } from "../../../interface/TradeDistribution";
import TradeDistributionTreeMap from "./TreeMap";

const TradeDistributionTreeMapContainer = ({
  tradeDistributionData,
}: {
  tradeDistributionData: TradedCoin[];
}) => {
  return (
    <div className="tw:w-full tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-white">
        Trade Distribution
      </div>
      {tradeDistributionData.length > 0 && (
        <TradeDistributionTreeMap
          tradeDistributionData={tradeDistributionData}
        />
      )}
    </div>
  );
};

export default TradeDistributionTreeMapContainer;
