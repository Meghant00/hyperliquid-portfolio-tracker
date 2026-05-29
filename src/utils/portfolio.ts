import type { PortfolioResponse } from "@nktkas/hyperliquid";

export const getAllTimeVolumeAndPnlFromPortfolio = (
  portfolio: PortfolioResponse,
) => {
  const allTimeData = portfolio[3];

  const allTimeVolume = allTimeData[1].vlm;
  const allTimeVolumeInNumber = Number(allTimeVolume);

  const allTimePnlData: [number, string][] = allTimeData[1].pnlHistory;

  const allTimePnl = allTimePnlData[allTimePnlData.length - 1][1];
  const allTimePnlInNumber = Number(allTimePnl);

  const pnlHistory: [number, string][] = allTimeData[1].pnlHistory;
  const accountValueHistory: [number, string][] =
    allTimeData[1].accountValueHistory;

  return {
    allTimePnl,
    allTimePnlInNumber,
    allTimeVolume,
    allTimeVolumeInNumber,
    accountValueHistory,
    pnlHistory,
  };
};
