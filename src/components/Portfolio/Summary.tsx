import { useEffect, useState } from "react";
import { useConnection } from "wagmi";
import { infoClient } from "../../hyperliquid/clients";
import type { PortfolioResponse } from "@nktkas/hyperliquid";

const PortfolioSummary = () => {
  const { address } = useConnection();

  const [portfolio, setPortfolio] = useState<PortfolioResponse | null>(null);

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

          setPortfolio(res);

          console.log(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tw:w-full tw:rounded-lg tw:h-8 tw:bg-black-200">
      <div className="tw:w-full tw:flex tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:border-b tw:border-b-darkslategray-100">
        <div className="tw:text-xs tw:text-white tw:h-8 tw:flex tw:flex-row tw:items-center tw:justify-start tw:px-3 tw:font-medium">
          Perps + Spot + Vault
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;
