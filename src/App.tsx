import { WagmiProvider } from "wagmi";
import { config } from "./config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default";
import Index from "./pages";
import ToastProvider from "./components/Toast/Toast";
import TradeDistribution from "./pages/trade-distribution";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <ToastProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<DefaultLayout />}>
                  <Route index element={<Index />}></Route>
                  <Route
                    path="/trade-distribution"
                    element={<TradeDistribution />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </WagmiProvider>
      </ToastProvider>
    </>
  );
}

export default App;
