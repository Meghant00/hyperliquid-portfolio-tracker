import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import { useConnection } from "wagmi";
import { useUserFills } from "../hooks/hyperliquid/useUserFillsFromSocket";
import { useUserClearHouseState } from "../hooks/hyperliquid/useUserClearingHouseState";
import { useEffect, useState } from "react";
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

  const [showSidebar, setShowSidebar] = useState(false);

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

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="background no-scrollbar tw:w-full tw:h-[calc(100dvh-56px)] tw:text-white tw:overflow-auto tw:flex tw:flex-row tw:items-start tw:justify-start">
        <div className="tw:hidden tw:xl:flex">
          <Sidebar />
        </div>
        <div
          className={`tw:w-screen tw:fixed tw:top-14 tw:left-0 tw:border-t tw:border-t-hyperliquid-gray-100 tw:z-999 tw:transition-all tw:duration-500 tw:flex tw:xl:hidden tw:transform ${showSidebar ? "tw:translate-x-0" : "tw:-translate-x-full"}`}
        >
          <Sidebar />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;
