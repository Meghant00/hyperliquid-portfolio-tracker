import { useEffect, useRef, useState } from "react";
import type { ISubscription, UserFillsResponse } from "@nktkas/hyperliquid";
import { subscriptionClient } from "../../socket/hyperliquid";

export const useUserFills = ({
  address,
}: {
  address: `0x${string}` | undefined;
}) => {
  const [userFills, setUserFills] = useState<UserFillsResponse | null>(null);

  const activeSubscriptionRef = useRef<ISubscription | null>(null);

  useEffect(() => {
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
          console.log(data);
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
