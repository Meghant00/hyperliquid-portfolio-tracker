import { useEffect } from "react";
import { useConnection } from "wagmi";
import { useHyperliquidInfoClient } from "../hooks/hyperliquid/useInfoClient";
import { useSubscriptionClient } from "../hooks/hyperliquid/useSubscriptionClient";

const Index = () => {
  const { address } = useConnection();

  const infoClient = useHyperliquidInfoClient();

  useEffect(() => {
    const controller = new AbortController();

    if (address) {
      fetchPortfolioOfAddress({ signal: controller.signal });
    }

    return () => controller.abort();
  }, [address]);

  const fetchPortfolioOfAddress = async ({
    signal,
  }: {
    signal: AbortSignal;
  }) => {
    try {
      if (address) {
        const res = await infoClient?.portfolio({ user: address }, signal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToSocket = () => {
    if (address) {
      const subscriptionClient = useSubscriptionClient();

      subscriptionClient?.userFills({ user: address }, (data) => {
        console.log(data);
      });
    }
  };

  return (
    <>
      <div className="tw:w-full tw:h-dvh">index 1</div>
      <div className="tw:w-full tw:h-dvh">index 2</div>
      <div className="tw:w-full tw:h-dvh">index 3</div>
    </>
  );
};

export default Index;
