import { InfoClient } from "@nktkas/hyperliquid";
import { useHyperliquidTransport } from "./useHyperliquidTransport";

export const useHyperliquidInfoClient = () => {
  const transport = useHyperliquidTransport();

  let infoClient: InfoClient | null = null;

  if (transport) {
    infoClient = new InfoClient({ transport: transport.http });
  }

  return infoClient;
};
