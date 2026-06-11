import { useConnection } from "wagmi";
import PrimaryButton from "../Button/Primary";
import { lazy, useState } from "react";
import ConnectedMenu from "./ConnectedMenu";

const ConnectDialog = lazy(() => import("./ConnectDialog"));

const ConnectWalletButton = () => {
  const { address } = useConnection();

  const [showConnectDialog, setShowConnectDialog] = useState(false);

  const connectWallet = () => {
    setShowConnectDialog(true);
  };

  const closeConnectWalletDialog = () => {
    setShowConnectDialog(false);
  };

  return (
    <>
      {address ? (
        <ConnectedMenu address={address} />
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
