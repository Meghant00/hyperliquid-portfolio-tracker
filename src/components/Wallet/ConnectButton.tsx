import { useConnection, useConnectors, useDisconnect } from "wagmi";
import PrimaryButton from "../Button/Primary";

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
        <PrimaryButton
          title={formattedWalletAddress}
          isPrimary={false}
          widthClass="tw:w-fit"
          textSizeClass="tw:text-xs"
          onClick={() => mutate()}
        />
      ) : (
        <PrimaryButton
          title="Connect"
          widthClass="tw:w-fit"
          onClick={() => connectWallet()}
        />
      )}
    </>
  );
};

export default ConnectWalletButton;
