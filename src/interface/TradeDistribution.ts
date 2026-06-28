export interface TradedCoin {
  name: string;
  totalTrades: number;
  totalVolume: number;
  totalPnl: number;
  largestProfit: number;
  largestLoss: number;
  totalNumberOfProfit: number;
  totalNumberOfLoss: number;
  totalProfit: number;
  totalLoss: number;
  totalTradesOfAllCoin: number;
}

export interface ActivelyTradedCoin {
  coin: string;
  image: string;
  totalTrades: number;
  totalVolume: number;
  totalPnl: number;
  largestProfit: number;
  largestLoss: number;
  totalNumberOfProfit: number;
  totalNumberOfLoss: number;
  totalProfit: number;
  totalLoss: number;
  displayTotalTrades: string;
  displayTotalVolume: string;
  displayTotalPnl: string;
}
