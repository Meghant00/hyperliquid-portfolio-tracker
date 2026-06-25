import { Treemap } from "recharts";
import type { TradedCoin } from "../../../interface/TradeDistribution";
import TreeMapContent from "./TreeMapContent";

const TradeDistributionTreeMap = ({
  tradeDistributionData,
}: {
  tradeDistributionData: TradedCoin[];
}) => {
  return (
    <div className="tw:w-full tw:h-full">
      <Treemap
        width="100%"
        height={800}
        data={tradeDistributionData as any[]}
        dataKey="totalTrades"
        content={TreeMapContent}
      ></Treemap>
    </div>
  );
};

export default TradeDistributionTreeMap;
