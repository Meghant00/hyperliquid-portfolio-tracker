import type { UserFillsResponse } from "@nktkas/hyperliquid";
import { formatDecimals } from "./number";
import type {
  ActivelyTradedCoin,
  TradedCoin,
} from "../interface/TradeDistribution";

const HYPER_LIQUID_IMAGE_URL = "https://app.hyperliquid.xyz/coins";

export const groupCoinsByUserFills = (userFills: UserFillsResponse) => {
  const coinsAndTrades: Record<string, TradedCoin> = {};

  userFills.forEach((userFill) => {
    if (Number(userFill.closedPnl)) {
      if (!Object.keys(coinsAndTrades).includes(userFill.coin)) {
        const totalProfit =
          Number(userFill.closedPnl) > 0 ? Number(userFill.closedPnl) : 0;
        const totalLoss =
          Number(userFill.closedPnl) < 0 ? Number(userFill.closedPnl) : 0;

        coinsAndTrades[userFill.coin] = {
          totalTrades: 1,
          totalVolume: Number(userFill.px) * Math.abs(Number(userFill.sz)),
          totalPnl: totalProfit ? totalProfit : totalLoss,
          largestLoss: 0,
          largestProfit: 0,
          name: userFill.coin,
          totalLoss: totalLoss,
          totalProfit: totalProfit,
          totalNumberOfLoss: totalProfit ? 0 : 1,
          totalNumberOfProfit: totalProfit ? 1 : 0,
        };
      } else {
        const currentCoin = coinsAndTrades[userFill.coin];

        currentCoin.totalTrades = currentCoin.totalTrades + 1;

        currentCoin.totalVolume =
          currentCoin.totalVolume +
          Number(userFill.px) * Math.abs(Number(userFill.sz));

        currentCoin.totalPnl =
          currentCoin.totalPnl + Number(userFill.closedPnl);

        const currentPnl = Number(userFill.closedPnl);

        if (currentPnl > 0) {
          currentCoin.totalProfit = currentCoin.totalProfit + currentPnl;
          currentCoin.totalNumberOfProfit += 1;
        } else {
          currentCoin.totalLoss = currentCoin.totalLoss + currentPnl;
          currentCoin.totalNumberOfLoss += 1;
        }

        if (Number(currentPnl) > currentCoin.largestProfit) {
          currentCoin.largestProfit = currentPnl;
        }

        if (Number(currentPnl) < currentCoin.largestLoss) {
          currentCoin.largestLoss = currentPnl;
        }
      }
    }
  });

  return coinsAndTrades;
};

export const getActivelyTradedCoin = (
  tradedCoins: Record<string, TradedCoin>,
) => {
  let activelyTradedCoin: ActivelyTradedCoin = {
    coin: "",
    image: "",
    totalTrades: 0,
    totalVolume: 0,
    totalPnl: 0,
    largestLoss: 0,
    largestProfit: 0,
    totalLoss: 0,
    totalNumberOfLoss: 0,
    totalNumberOfProfit: 0,
    totalProfit: 0,
    displayTotalTrades: "0",
    displayTotalVolume: "0",
    displayTotalPnl: "0",
  };

  Object.keys(tradedCoins).forEach((coin) => {
    const currentCoin = tradedCoins[coin];

    if (currentCoin.totalTrades > activelyTradedCoin.totalTrades) {
      activelyTradedCoin = {
        coin: coin,
        image: `${HYPER_LIQUID_IMAGE_URL}/${coin}.svg`,
        totalTrades: currentCoin.totalTrades,
        totalVolume: currentCoin.totalVolume,
        totalPnl: currentCoin.totalPnl,
        largestLoss: currentCoin.largestLoss,
        largestProfit: currentCoin.largestProfit,
        totalLoss: currentCoin.totalLoss,
        totalNumberOfLoss: currentCoin.totalNumberOfLoss,
        totalNumberOfProfit: currentCoin.totalNumberOfProfit,
        totalProfit: currentCoin.totalProfit,
        displayTotalTrades: formatDecimals(currentCoin.totalTrades),
        displayTotalVolume: formatDecimals(currentCoin.totalVolume),
        displayTotalPnl: formatDecimals(currentCoin.totalPnl),
      };
    }
  });

  return activelyTradedCoin;
};

export const getTradeDistributionData = (
  allCoins: Record<string, TradedCoin>,
) => {
  let tradeDistributionData: TradedCoin[] = [];

  for (const coin of Object.keys(allCoins)) {
    tradeDistributionData.push(allCoins[coin]);
  }

  return tradeDistributionData;
};
