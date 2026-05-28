import {
  HttpTransport,
  InfoClient,
  SubscriptionClient,
  WebSocketTransport,
} from "@nktkas/hyperliquid";

const NETWORK = import.meta.env.VITE_NETWORK;
const isTestnet = NETWORK === "TESTNET";

const httpTransport = new HttpTransport({ isTestnet });
const socketTransport = new WebSocketTransport({ isTestnet });

export const infoClient = new InfoClient({ transport: httpTransport });
export const subscriptionClient = new SubscriptionClient({
  transport: socketTransport,
});
