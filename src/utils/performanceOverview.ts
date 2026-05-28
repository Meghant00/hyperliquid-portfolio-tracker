import type { UserFillsResponse } from "@nktkas/hyperliquid";

export const calculateTotalWinsAndLossesFromUserFills = (
  userFills: UserFillsResponse,
) => {
  let wins = 0;
  let losses = 0;

  userFills.forEach((fill) => {
    if (Number(fill.closedPnl) && Number(fill.closedPnl) > 0) {
      wins += 1;
    } else if (Number(fill.closedPnl) < 0) {
      losses += 1;
    }
  });

  return { wins, losses };
};

export const calculateLargestProfitAndAverageProfit = (
  userFills: UserFillsResponse,
) => {
  let totalProfit = 0;
  let largestProfit = 0;
  let profitableTrades = 0;

  userFills.forEach((fill) => {
    const currentProfit = Number(fill.closedPnl);

    if (currentProfit > largestProfit && currentProfit) {
      largestProfit = currentProfit;
    }

    if (currentProfit > 0) {
      totalProfit += currentProfit;

      profitableTrades++;
    }
  });

  const averageProfit = parseFloat((totalProfit / profitableTrades).toFixed(2));

  return {
    totalProfit: totalProfit,
    averageProfit: averageProfit,
    largestProfit: largestProfit,
  };
};

export const calculateLargestLossAndAverageLoss = (
  userFills: UserFillsResponse,
) => {
  let totalLoss = 0;
  let largestLoss = 0;
  let nonProfitableTrade = 0;

  userFills.forEach((fill) => {
    const currentLoss = Number(fill.closedPnl);

    if (currentLoss < largestLoss && currentLoss) {
      largestLoss = currentLoss;
    }

    if (currentLoss <= 0) {
      totalLoss += currentLoss;
      nonProfitableTrade++;
    }
  });

  const averageLoss = parseFloat((totalLoss / nonProfitableTrade).toFixed(2));

  return {
    totalLoss: totalLoss,
    averageLoss: averageLoss,
    largestLoss: largestLoss,
  };
};
