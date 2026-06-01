import { useEffect, useState } from "react";
import { useConnection } from "wagmi";
import { infoClient } from "../../../hyperliquid/clients";
import { getAllTimeVolumeAndPnlFromPortfolio } from "../../../utils/portfolio";
import type { IPortfolioSummary } from "../../../interface/Portfolio";
import TotalVolume from "./TotalVolume";
import TotalEquity from "./TotalEquity";
import TotalPnl from "./TotalPnl";
import AccountHistory from "../AccountHistory/AccountHistory";

const PortfolioOverview = () => {
  const { address } = useConnection();

  const [portfolioSummary, setPortfolioSummary] = useState<IPortfolioSummary>({
    allTimePnl: "0",
    allTimePnlInNumber: 0,
    allTimeVolume: "0",
    allTimeVolumeInNumber: 0,
    totalEquity: "0",
    totalEquityInNumber: 0,
  });

  const [accountValueHistory, setAccountValueHistory] = useState<
    [number, string][]
  >([]);
  const [pnlHistory, setPnlHistory] = useState<[number, string][]>([]);

  useEffect(() => {
    const controller = new AbortController();

    fetchPortfolioOfAddress({ signal: controller.signal });

    return () => controller.abort();
  }, [address, infoClient]);

  const fetchPortfolioOfAddress = async ({
    signal,
  }: {
    signal: AbortSignal;
  }) => {
    try {
      if (address) {
        if (infoClient) {
          const res = await infoClient.portfolio({ user: address }, signal);

          if (res) {
            const {
              accountValueHistory: allTimeAccountValueHistory,
              allTimePnl,
              allTimePnlInNumber,
              allTimeVolume,
              allTimeVolumeInNumber,
              pnlHistory: allTimePnlHistory,
            } = getAllTimeVolumeAndPnlFromPortfolio(res);

            setPortfolioSummary({
              allTimePnl: allTimePnl,
              allTimePnlInNumber: allTimePnlInNumber,
              allTimeVolume: allTimeVolume,
              allTimeVolumeInNumber: allTimeVolumeInNumber,
              totalEquity: "0",
              totalEquityInNumber: 0,
            });

            setAccountValueHistory(allTimeAccountValueHistory);
            setPnlHistory(allTimePnlHistory);
          }
        }
      } else {
        resetPortfolioSummary();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPortfolioSummary = () => {
    setPortfolioSummary({
      allTimePnl: "0",
      allTimePnlInNumber: 0,
      allTimeVolume: "0",
      allTimeVolumeInNumber: 0,
      totalEquity: "0",
      totalEquityInNumber: 0,
    });

    setAccountValueHistory([]);
    setPnlHistory([]);
  };

  return (
    <div className="tw:w-full tw:grid tw:grid-cols-1 tw:gap-y-3 tw:lg:grid-cols-3 tw:lg:gap-x-3">
      <div className="tw:w-full tw:grid tw:grid-cols-1 tw:gap-y-4 tw:md:grid-cols-2 tw:md:gap-4">
        <div className="tw:w-full tw:md:col-span-2">
          <TotalEquity totalEquity={portfolioSummary.totalEquity} />
        </div>
        <TotalVolume
          totalVolumeInNumber={portfolioSummary.allTimeVolumeInNumber}
        />
        <TotalPnl totalPnlInNumber={portfolioSummary.allTimePnlInNumber} />
      </div>
      <div className="tw:w-full tw:col-span-2">
        <AccountHistory
          accountValueHistory={accountValueHistory}
          pnlHistory={pnlHistory}
        />
      </div>
    </div>
  );
};

export default PortfolioOverview;
