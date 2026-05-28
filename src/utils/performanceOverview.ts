import type { UserFillsResponse } from "@nktkas/hyperliquid";

export const calculateTotalWinsAndLossesFromUserFills = (
  userFills: UserFillsResponse,
) => {
  let wins = 0;
  let losses = 0;

  userFills.forEach((fill) => {
    if (Number(fill.closedPnl) > 0) {
      wins += 1;
    } else {
      losses += 1;
    }
  });

  return { wins, losses };
};
