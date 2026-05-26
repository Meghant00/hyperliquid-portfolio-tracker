import { useConnection, useConnectors, useDisconnect } from "wagmi";

const ConnectWalletButton = () => {
  const { address } = useConnection();
  const connectors = useConnectors();
  const { mutate } = useDisconnect();

  const connectWallet = () => {
    const metaMaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask",
    );

    if (metaMaskConnector) {
      metaMaskConnector.connect();
    }
  };

  const formattedWalletAddress = address
    ? address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length)
    : "";

  return (
    <>
      {address ? (
        <button
          className="tw:rounded-lg tw:bg-turquoise-100 tw:text-black tw:text-xs tw:px-4 tw:h-8 tw:flex tw:flex-col tw:items-center tw:justify-center tw:font-medium"
          onClick={() => mutate()}
        >
          {formattedWalletAddress}
        </button>
      ) : (
        <button
          className="tw:rounded-lg tw:bg-turquoise-100 tw:text-black tw:text-xs tw:px-4 tw:h-8 tw:flex tw:flex-col tw:items-center tw:justify-center tw:font-medium"
          onClick={() => connectWallet()}
        >
          Connect
        </button>
      )}
    </>
  );
};

export default ConnectWalletButton;
