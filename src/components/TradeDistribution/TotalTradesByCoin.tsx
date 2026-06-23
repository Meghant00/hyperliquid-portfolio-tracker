import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/state";
import {
  getActivelyTradedCoin,
  groupCoinsByUserFills,
  type ActivelyTradedCoin,
  type TradedCoin,
} from "../../utils/tradeDistribution";
import MostActivelyTradedCoin from "./Overview/MostActivelyTraded";
import TotalVolumeByCoin from "./Overview/TotalVolumeByCoin";
import TotalPnlByCoin from "./Overview/TotalPnlByCoin";
import LargestPnlByCoin from "./Overview/LargestPnlByCoin";

const TotalTradesByCoin = () => {
  const userFills = useAppSelector((state) => state.userFills);

  const [, setGroupedCoins] = useState<null | Record<string, TradedCoin>>(null);

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
  };

  return (
    <>
      {activelyTradedCoin && (
        <div className="tw:w-full tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-4 tw:flex-wrap">
          <MostActivelyTradedCoin activelyTradedCoin={activelyTradedCoin} />
          <div className="tw:w-fit">
            <TotalVolumeByCoin
              totalVolumeInNumber={activelyTradedCoin.totalVolume}
              coin={activelyTradedCoin.coin}
            />
          </div>
          <div className="tw:w-fit">
            <TotalPnlByCoin
              totalPnlInNumber={activelyTradedCoin.totalPnl}
              coin={activelyTradedCoin.coin}
            />
          </div>
          <div className="tw:w-fit">
            <LargestPnlByCoin
              totalPnlInNumber={activelyTradedCoin.largestProfit}
              coin={activelyTradedCoin.coin}
            />
          </div>
          <div className="tw:w-fit">
            <LargestPnlByCoin
              totalPnlInNumber={activelyTradedCoin.largestLoss}
              coin={activelyTradedCoin.coin}
              isProfit={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TotalTradesByCoin;
