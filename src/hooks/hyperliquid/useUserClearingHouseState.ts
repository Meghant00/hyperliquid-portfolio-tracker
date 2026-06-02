import { useEffect, useRef, useState } from "react";
import { subscriptionClient } from "../../hyperliquid/clients";
import type {
  ClearinghouseStateWsEvent,
  ISubscription,
} from "@nktkas/hyperliquid";

export const useUserClearHouseState = ({
  address,
}: {
  address: `0x${string}` | undefined;
}) => {
  const [userClearingHouseState, setUserClearingHouseState] =
    useState<ClearinghouseStateWsEvent | null>(null);

  let activeSubscriptionRef = useRef<ISubscription | null>(null);
  let pendingSubscriptionPromiseRef = useRef<Promise<ISubscription> | null>(
    null,
  );

  const subscribeToUserClearigHouseState = async ({
    address,
    isCurrentEffect,
  }: {
    address: `0x${string}`;
    isCurrentEffect: boolean;
  }) => {
    if (!address) {
      return "User is required.";
    }

    const subscriptionPromise = subscriptionClient.clearinghouseState(
      { user: address },
      (data) => {
        setUserClearingHouseState(data);
      },
    );

    pendingSubscriptionPromiseRef.current = subscriptionPromise;

    const clearinghouseStateSubscription = await subscriptionPromise;

    if (!isCurrentEffect) {
      await clearinghouseStateSubscription.unsubscribe();
    } else {
      activeSubscriptionRef.current = clearinghouseStateSubscription;

      pendingSubscriptionPromiseRef.current = null;
    }
  };

  const unsubscribeToUserClearingHouseState = async () => {
    if (pendingSubscriptionPromiseRef.current) {
      try {
        const resolvedSubscription =
          await pendingSubscriptionPromiseRef.current;

        resolvedSubscription.unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }

    if (activeSubscriptionRef.current) {
      await activeSubscriptionRef.current.unsubscribe();
    }
  };

  useEffect(() => {
    if (!subscriptionClient) {
      console.log("Subscription Client not initialized");

      return;
    }

    let isCurrentEffect = true;

    if (address) {
      subscribeToUserClearigHouseState({ address, isCurrentEffect });
    } else {
    }

    return () => {
      isCurrentEffect = false;
      unsubscribeToUserClearingHouseState();
    };
  }, [address]);

  return { userClearingHouseState, unsubscribeToUserClearingHouseState };
};
