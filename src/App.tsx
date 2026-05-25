import { WagmiProvider } from "wagmi";
import { config } from "./config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <h1 className="tw:text-3xl tw:text-red-600"> Hello World</h1>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
