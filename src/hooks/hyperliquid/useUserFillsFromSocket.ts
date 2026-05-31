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
  let pendingSubscriptionPromiseRef = useRef<Promise<ISubscription> | null>(
    null,
  );

  const unsubscribeUserFills = async () => {
    if (pendingSubscriptionPromiseRef.current) {
      try {
        const resolvedSubscription =
          await pendingSubscriptionPromiseRef.current;

        await resolvedSubscription.unsubscribe();
      } catch (error) {
        console.log(error);
      }

      pendingSubscriptionPromiseRef.current = null;
    }

    if (activeSubscriptionRef.current) {
      await activeSubscriptionRef.current.unsubscribe();
    }
  };

  const subscribeToUserFills = async ({
    address,
    isCurrentEffect,
  }: {
    address: `0x${string}`;
    isCurrentEffect: boolean;
  }) => {
    await unsubscribeUserFills();

    const userFillsSubscriptionPromise = subscriptionClient.userFills(
      { user: address, aggregateByTime: true },
      (data) => {
        setUserFills(data);
      },
    );

    pendingSubscriptionPromiseRef.current = userFillsSubscriptionPromise;

    const userFillsSubscription = await userFillsSubscriptionPromise;

    if (!isCurrentEffect) {
      await userFillsSubscription.unsubscribe();
    } else {
      activeSubscriptionRef.current = userFillsSubscription;
    }

    if (isCurrentEffect) {
      pendingSubscriptionPromiseRef.current = null;
    }
  };

  useEffect(() => {
    let isCurrentEffect = true;

    if (!subscriptionClient) {
      console.log("Subscription client not initialized");
      return;
    }

    if (address) {
      subscribeToUserFills({ address, isCurrentEffect });
    } else {
      unsubscribeUserFills();
    }

    return () => {
      isCurrentEffect = false;
      unsubscribeUserFills();
    };
  }, [address]);

  return { userFills, unsubscribeUserFills };
};
