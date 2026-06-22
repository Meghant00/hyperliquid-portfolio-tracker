import type { UserFillsResponse } from "@nktkas/hyperliquid";
import { formatDecimals } from "./number";

export interface TradedCoin {
  totalTrades: number;
  totalVolume: number;
}

export interface ActivelyTradedCoin {
  coin: string;
  image: string;
  totalTrades: number;
  totalVolume: number;
  displayTotalTrades: string;
  displayTotalVolume: string;
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
        };
      } else {
        const currentCoin = coinsAndTrades[userFill.coin];

        currentCoin.totalTrades = currentCoin.totalTrades + 1;

        currentCoin.totalVolume =
          currentCoin.totalVolume +
          Number(userFill.px) * Math.abs(Number(userFill.sz));
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
    displayTotalTrades: "0",
    displayTotalVolume: "0",
  };

  Object.keys(tradedCoins).forEach((coin) => {
    const currentCoin = tradedCoins[coin];

    if (currentCoin.totalTrades > activelyTradedCoin.totalTrades) {
      activelyTradedCoin = {
        coin: coin,
        image: `${HYPER_LIQUID_IMAGE_URL}/${coin}.svg`,
        totalTrades: currentCoin.totalTrades,
        totalVolume: currentCoin.totalVolume,
        displayTotalTrades: formatDecimals(currentCoin.totalTrades),
        displayTotalVolume: formatDecimals(currentCoin.totalVolume),
      };
    }
  });

  return activelyTradedCoin;
};
