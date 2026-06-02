import type { ClearinghouseStateWsEvent } from "@nktkas/hyperliquid";
import { useUserClearHouseState } from "./hyperliquid/useUserClearingHouseState";
import { useConnection } from "wagmi";
import { useEffect, useState } from "react";
import { formatDecimals } from "../utils/number";

export const useUserEquity = () => {
  const { address } = useConnection();

  const { userClearingHouseState: userClearingHouseStateFromSocket } =
    useUserClearHouseState({ address });

  const [userEquity, setUserEquity] = useState({
    totalEquity: "0",
    totalEquityInNumber: 0,
  });

  const setClearingHouseStateFromSocket = (
    clearingHouseStateEvent: ClearinghouseStateWsEvent | null,
  ) => {
    if (clearingHouseStateEvent) {
      const totalBalance = Number(
        clearingHouseStateEvent.clearinghouseState.withdrawable,
      );

      setUserEquity({
        totalEquity: formatDecimals(totalBalance, 2),
        totalEquityInNumber: totalBalance,
      });
    }
  };

  useEffect(() => {
    setClearingHouseStateFromSocket(userClearingHouseStateFromSocket);

    return () => {
      setUserEquity({
        totalEquity: "0",
        totalEquityInNumber: 0,
      });
    };
  }, [userClearingHouseStateFromSocket]);

  return { userEquity };
};
