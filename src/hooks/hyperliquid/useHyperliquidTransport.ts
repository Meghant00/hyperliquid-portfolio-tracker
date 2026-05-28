import { HttpTransport, WebSocketTransport } from "@nktkas/hyperliquid";

export const useHyperliquidTransport = () => {
  const NETWORK = import.meta.env.VITE_NETWORK;

  const isTestnet = NETWORK === "TESTNET";

  const transport = new HttpTransport({ isTestnet: isTestnet });

  const socketTransport = new WebSocketTransport({ isTestnet: isTestnet });

  return { http: transport, ws: socketTransport };
};
