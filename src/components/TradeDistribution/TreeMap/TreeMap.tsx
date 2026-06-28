import { Treemap } from "recharts";
import type { TradedCoin } from "../../../interface/TradeDistribution";
import TreeMapContent from "./TreeMapContent";

const TradeDistributionTreeMap = ({
  tradeDistributionData,
}: {
  tradeDistributionData: TradedCoin[];
}) => {
  return (
    <div className="tw:w-full tw:h-125 tw:md:h-[calc(100dvh-56px-32px-32px-32px-32px-100px-12px-20px)] tw:overflow-hidden">
      <Treemap
        width="100%"
        height="100%"
        data={tradeDistributionData as any[]}
        dataKey="totalTrades"
        content={TreeMapContent}
      ></Treemap>
    </div>
  );
};

export default TradeDistributionTreeMap;
