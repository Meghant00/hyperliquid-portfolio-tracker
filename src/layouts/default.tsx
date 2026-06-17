import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useConnection } from "wagmi";
import { useUserFills } from "../hooks/hyperliquid/useUserFillsFromSocket";
import { useUserClearHouseState } from "../hooks/hyperliquid/useUserClearingHouseState";
import { useEffect } from "react";
import { getUserFills } from "../services/user";
import { useAppDispatch, useAppSelector } from "../hooks/state";
import type { UserFillsWsEvent } from "@nktkas/hyperliquid";
import { setUserFills } from "../slices/userFillsSlice";
import Sidebar from "../components/Sidebar/Sidebar";

const DefaultLayout = () => {
  const userFills = useAppSelector((state) => state.userFills.userFills);

  const dispatch = useAppDispatch();

  const { address } = useConnection();

  const { userFills: userFillsFromSocket, unsubscribeUserFills } = useUserFills(
    { address },
  );
  const { unsubscribeToUserClearingHouseState } = useUserClearHouseState({
    address,
  });

  useEffect(() => {
    const abortController = new AbortController();

    if (!address) {
    } else {
      unsubscribeUserFills();
      unsubscribeToUserClearingHouseState();
      fetchAndSetUserFills(abortController.signal);
    }

    return () => {
      abortController.abort;
    };
  }, [address]);

  useEffect(() => {
    setUserFillsFromSocket(userFillsFromSocket);

    return () => {};
  }, [userFillsFromSocket]);

  const setUserFillsFromSocket = (userFillsEvent: UserFillsWsEvent | null) => {
    if (userFillsEvent) {
      if (!userFillsEvent.isSnapshot) {
        dispatch(setUserFills([...userFillsEvent.fills, ...userFills]));
      }
    }
  };

  const fetchAndSetUserFills = async (signal: AbortSignal) => {
    if (address) {
      const userFillsRes = await getUserFills({
        address: address,
        signal: signal,
      });

      dispatch(setUserFills(userFillsRes));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="background no-scrollbar tw:w-full tw:h-[calc(100dvh-56px)] tw:text-white tw:overflow-auto tw:flex tw:flex-row tw:items-start tw:justify-start">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
