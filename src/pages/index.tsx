import { useConnection } from "wagmi";
import PerformanceOverview from "../components/Portfolio/PerformanceOverview";
import { useUserFills } from "../hooks/hyperliquid/useUserFillsFromSocket";
import { useEffect, useRef, useState } from "react";
import type { UserFillsResponse, UserFillsWsEvent } from "@nktkas/hyperliquid";
import {
  calculateLargestLossAndAverageLoss,
  calculateLargestProfitAndAverageProfit,
  calculateTotalWinsAndLossesFromUserFills,
} from "../utils/performanceOverview";
import { getUserFills } from "../services/user";
import BestAndWorst from "../components/Portfolio/BestAndWorst";
import PortfolioOverview from "../components/Portfolio/Overview/Overview";

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

  const [bestAndWorstTrades, setBestAndWorstTrades] = useState({
    averageProfit: 0,
    averageLoss: 0,
    largestProfit: 0,
    largestLoss: 0,
  });

  useEffect(() => {
    setUserFillsFromSocket(userFillsFromSocket);

    return () => {};
  }, [userFillsFromSocket]);

  useEffect(() => {
    if (!address) {
      resetBestAndWorstTrades();
      resetPerformanceOverview();
    }
  }, [address]);

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
        calculateBestAndWorstTrades();
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
      calculateBestAndWorstTrades();
    }
  };

  const calculatePerformanceOverview = () => {
    const { wins, losses } = calculateTotalWinsAndLossesFromUserFills(
      userFills.current,
    );

    const totalTrades = wins + losses;

    const winRate = parseFloat(((wins / totalTrades) * 100).toFixed(2));

    setPerformanceOverview({
      losses: losses,
      totalTrades: totalTrades,
      winRate: winRate,
      wins: wins,
    });
  };

  const calculateBestAndWorstTrades = () => {
    const { averageProfit, largestProfit } =
      calculateLargestProfitAndAverageProfit(userFills.current);

    const { averageLoss, largestLoss } = calculateLargestLossAndAverageLoss(
      userFills.current,
    );

    setBestAndWorstTrades({
      averageLoss: averageLoss,
      averageProfit: averageProfit,
      largestLoss: largestLoss,
      largestProfit: largestProfit,
    });
  };

  const resetPerformanceOverview = () => {
    setPerformanceOverview({
      losses: 0,
      totalTrades: 0,
      winRate: 0,
      wins: 0,
    });
  };

  const resetBestAndWorstTrades = () => {
    setBestAndWorstTrades({
      averageLoss: 0,
      averageProfit: 0,
      largestLoss: 0,
      largestProfit: 0,
    });
  };

  return (
    <>
      <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center">
        <div className="tw:p-8 tw:w-full tw:max-w-328 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-8">
          <PortfolioOverview />
          <PerformanceOverview
            losses={performanceOverview.losses}
            totalTrades={performanceOverview.totalTrades}
            wins={performanceOverview.wins}
            winRate={performanceOverview.winRate}
          />
          <BestAndWorst
            averageLoss={bestAndWorstTrades.averageLoss}
            averageProfit={bestAndWorstTrades.averageProfit}
            largestLoss={bestAndWorstTrades.largestLoss}
            largestProfit={bestAndWorstTrades.largestProfit}
          />
        </div>
      </div>
    </>
  );
};

export default Index;
