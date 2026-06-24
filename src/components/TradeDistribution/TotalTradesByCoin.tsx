import MostActivelyTradedCoin from "./Overview/MostActivelyTraded";
import TotalVolumeByCoin from "./Overview/TotalVolumeByCoin";
import TotalPnlByCoin from "./Overview/TotalPnlByCoin";
import LargestPnlByCoin from "./Overview/LargestPnlByCoin";
import type { ActivelyTradedCoin } from "../../interface/TradeDistribution";

const TotalTradesByCoin = ({
  activelyTradedCoin,
}: {
  activelyTradedCoin: ActivelyTradedCoin | null;
}) => {
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
