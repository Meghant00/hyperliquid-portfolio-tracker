import type { UserFillsResponse } from "@nktkas/hyperliquid";
import { formatDecimals } from "./number";

export interface TradedCoin {
  totalTrades: number;
  totalVolume: number;
  totalPnl: number;
  largestProfit: number;
  largestLoss: number;
}

export interface ActivelyTradedCoin {
  coin: string;
  image: string;
  totalTrades: number;
  totalVolume: number;
  totalPnl: number;
  largestProfit: number;
  largestLoss: number;
  displayTotalTrades: string;
  displayTotalVolume: string;
  displayTotalPnl: string;
}

const HYPER_LIQUID_IMAGE_URL = "https://app.hyperliquid.xyz/coins";

export const groupCoinsByUserFills = (userFills: UserFillsResponse) => {
  const coinsAndTrades: Record<string, TradedCoin> = {};

  userFills.forEach((userFill) => {
    if (Number(userFill.closedPnl)) {
      if (!Object.keys(coinsAndTrades).includes(userFill.coin)) {
        coinsAndTrades[userFill.coin] = {
          totalTrades: 1,
          totalVolume: Number(userFill.px) * Math.abs(Number(userFill.sz)),
          totalPnl: 0,
          largestLoss: 0,
          largestProfit: 0,
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
        displayTotalTrades: formatDecimals(currentCoin.totalTrades),
        displayTotalVolume: formatDecimals(currentCoin.totalVolume),
        displayTotalPnl: formatDecimals(currentCoin.totalPnl),
      };
    }
  });

  return activelyTradedCoin;
};
