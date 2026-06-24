import { useEffect, useState } from "react";
import TotalTradesByCoin from "../components/TradeDistribution/TotalTradesByCoin";
import TradeDistributionTreeMapContainer from "../components/TradeDistribution/TreeMap/TreeMapContainer";
import { useAppSelector } from "../hooks/state";
import {
  getActivelyTradedCoin,
  getTradeDistributionData,
  groupCoinsByUserFills,
} from "../utils/tradeDistribution";
import type {
  ActivelyTradedCoin,
  TradedCoin,
} from "../interface/TradeDistribution";

const TradeDistribution = () => {
  const userFills = useAppSelector((state) => state.userFills);

  const [, setGroupedCoins] = useState<null | Record<string, TradedCoin>>(null);
  const [tradeDistributionData, setTradeDistributionData] = useState<
    TradedCoin[]
  >([]);

  const [activelyTradedCoin, setActivelyTradedCoin] =
    useState<null | ActivelyTradedCoin>(null);

  useEffect(() => {
    groupCoins();

    return () => {
      setGroupedCoins(null);
    };
  }, [userFills]);

  const groupCoins = () => {
    const allGroupedCoins = groupCoinsByUserFills(userFills.userFills);

    setGroupedCoins(allGroupedCoins);

    const tempActivelyTradedCoin = getActivelyTradedCoin(allGroupedCoins);

    setActivelyTradedCoin(tempActivelyTradedCoin);

    const tempTradeDistributionData = getTradeDistributionData(allGroupedCoins);

    setTradeDistributionData(tempTradeDistributionData);
  };

  return (
    <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center">
      <div className="tw:p-8 tw:w-full tw:max-w-328 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-8">
        <TotalTradesByCoin activelyTradedCoin={activelyTradedCoin} />
        <TradeDistributionTreeMapContainer
          tradeDistributionData={tradeDistributionData}
        />
      </div>
    </div>
  );
};

export default TradeDistribution;
