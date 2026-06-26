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
        style={{
          height:
            "calc(100dvh - 56px - 32px - 32px - 32px - 32px - 100px - 12px - 12px - 20px)",
        }}
        data={tradeDistributionData as any[]}
        dataKey="totalTrades"
        content={TreeMapContent}
      ></Treemap>
    </div>
  );
};

export default TradeDistributionTreeMap;
