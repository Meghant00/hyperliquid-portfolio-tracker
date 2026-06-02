import type { ClearinghouseStateWsEvent } from "@nktkas/hyperliquid";
import { useUserClearHouseState } from "./hyperliquid/useUserClearingHouseState";
import { useConnection } from "wagmi";
import { useEffect, useRef } from "react";
import { formatDecimals } from "../utils/number";

export const useUserEquity = () => {
  const { address } = useConnection();

  const { userClearingHouseState: userClearingHouseStateFromSocket } =
    useUserClearHouseState({ address });

  const userEquityRef = useRef<{
    totalEquity: string;
    totalEquityInNumber: number;
  }>({
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

      userEquityRef.current = {
        totalEquity: formatDecimals(totalBalance, 2),
        totalEquityInNumber: totalBalance,
      };
    }
  };

  useEffect(() => {
    setClearingHouseStateFromSocket(userClearingHouseStateFromSocket);

    return () => {
      userEquityRef.current = {
        totalEquity: "0",
        totalEquityInNumber: 0,
      };
    };
  }, [userClearingHouseStateFromSocket]);

  return { userEquity: userEquityRef.current };
};
