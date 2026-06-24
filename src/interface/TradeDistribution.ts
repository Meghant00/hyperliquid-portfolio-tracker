export interface TradedCoin {
  name: string;
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
