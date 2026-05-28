import { useConnection } from "wagmi";
import PerformanceOverview from "../components/Portfolio/PerformanceOverview";
import PortfolioSummary from "../components/Portfolio/Summary";
import { useUserFills } from "../hooks/hyperliquid/useUserFillsFromSocket";
import { useEffect, useRef, useState } from "react";
import type { UserFillsResponse, UserFillsWsEvent } from "@nktkas/hyperliquid";
import { calculateTotalWinsAndLossesFromUserFills } from "../utils/performanceOverview";
import { getUserFills } from "../services/user";

const Index = () => {
  const { address } = useConnection();

  const userFills = useRef<UserFillsResponse>([]);

  const userFillsFromSocket = useUserFills({ address });

  const [performanceOverview, setPerformanceOverview] = useState({
    totalTrades: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
  });

  useEffect(() => {
    setUserFillsFromSocket(userFillsFromSocket);

    return () => {};
  }, [userFillsFromSocket]);

  useEffect(() => {
    const abortController = new AbortController();

    fetchAndSetUserFills(abortController.signal);

    return () => {
      abortController.abort;
    };
  }, []);

  const setUserFillsFromSocket = (userFillsEvent: UserFillsWsEvent | null) => {
    if (userFillsEvent) {
      if (!userFillsEvent.isSnapshot) {
        userFills.current = [...userFillsEvent.fills, ...userFills.current];
        calculatePerformanceOverview();
      }
    }
  };

  const fetchAndSetUserFills = async (signal: AbortSignal) => {
    if (address) {
      const userFillsRes = await getUserFills({
        address: address,
        signal: signal,
      });

      userFills.current = userFillsRes;

      calculatePerformanceOverview();
    }
  };

  const calculatePerformanceOverview = () => {
    const totalTrades = userFills.current.length;

    const { wins, losses } = calculateTotalWinsAndLossesFromUserFills(
      userFills.current,
    );

    const winRate = parseFloat(((wins / totalTrades) * 100).toFixed(2));

    setPerformanceOverview({
      losses: losses,
      totalTrades: totalTrades,
      winRate: winRate,
      wins: wins,
    });
  };

  return (
    <>
      <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center">
        <div className="tw:p-8 tw:w-full tw:max-w-328 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-8">
          <PortfolioSummary />
          <PerformanceOverview
            losses={performanceOverview.losses}
            totalTrades={performanceOverview.totalTrades}
            wins={performanceOverview.wins}
            winRate={performanceOverview.winRate}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
