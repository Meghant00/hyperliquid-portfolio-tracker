import { useEffect } from "react";
import { useConnection } from "wagmi";
import { useUserFills } from "../hooks/hyperliquid/useUserFillsFromSocket";
import { infoClient } from "../socket/hyperliquid";

const Index = () => {
  const { address } = useConnection();

  const userFills = useUserFills({ address: address });

  useEffect(() => {
    const controller = new AbortController();

    if (address) {
      fetchPortfolioOfAddress({ signal: controller.signal });
    }

    return () => controller.abort();
  }, [address, infoClient]);

  const fetchPortfolioOfAddress = async ({
    signal,
  }: {
    signal: AbortSignal;
  }) => {
    try {
      if (address) {
        if (infoClient) {
          const res = await infoClient.portfolio({ user: address }, signal);

          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
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
