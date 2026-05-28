import { SubscriptionClient } from "@nktkas/hyperliquid";
import { useHyperliquidTransport } from "./useHyperliquidTransport";

export const useSubscriptionClient = () => {
  const transport = useHyperliquidTransport();

  let subscriptionClient: SubscriptionClient | null = null;

  if (transport) {
    subscriptionClient = new SubscriptionClient({ transport: transport.ws });
  }

  return subscriptionClient;
};
