import { useConnection, useDisconnect } from "wagmi";
import PrimaryButton from "../Button/Primary";
import { useState } from "react";
import ConnectDialog from "./ConnectDialog";

const ConnectWalletButton = () => {
  const { address } = useConnection();
  const { mutate } = useDisconnect();

  const [showConnectDialog, setShowConnectDialog] = useState(false);

  const connectWallet = () => {
    setShowConnectDialog(true);
  };

  const formattedWalletAddress = address
    ? address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length)
    : "";

  const closeConnectWalletDialog = () => {
    setShowConnectDialog(false);
  };

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
      <ConnectDialog
        showConnectDialog={showConnectDialog}
        closeConnectWalletDialog={closeConnectWalletDialog}
      />
    </>
  );
};

export default ConnectWalletButton;
