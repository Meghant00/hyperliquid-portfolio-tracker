import { useEffect, useRef, useState } from "react";
import type { ISubscription, UserFillsWsEvent } from "@nktkas/hyperliquid";
import { subscriptionClient } from "../../hyperliquid/clients";

export const useUserFills = ({
  address,
}: {
  address: `0x${string}` | undefined;
}) => {
  const [userFills, setUserFills] = useState<UserFillsWsEvent | null>(null);

  const activeSubscriptionRef = useRef<ISubscription | null>(null);

  useEffect(() => {
    console.log(`Custom hook wallet changed ${address}`);

    if (!subscriptionClient) {
      console.log("Subscription client not initialized");
      return;
    }

    const subscribeToUserFills = async ({
      address,
    }: {
      address: `0x${string}`;
    }) => {
      if (activeSubscriptionRef.current) {
        await activeSubscriptionRef.current.unsubscribe();
        activeSubscriptionRef.current = null;
      }

      activeSubscriptionRef.current = await subscriptionClient.userFills(
        { user: address, aggregateByTime: true },
        (data) => {
          console.log("user fills data", data);

          setUserFills(data);
        },
      );
    };

    const unsubscribeUserFills = async () => {
      if (activeSubscriptionRef.current) {
        await activeSubscriptionRef.current.unsubscribe();
      }
    };

    if (address) {
      subscribeToUserFills({ address });
    } else {
      unsubscribeUserFills();
    }

    return () => {
      unsubscribeUserFills();
    };
  }, [address]);

  return userFills;
};
