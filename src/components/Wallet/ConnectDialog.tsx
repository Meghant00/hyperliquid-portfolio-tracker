import { useConnectors, type Connector } from "wagmi";
import PrimaryDialog from "../Dialog/Primary";
import metamaskImage from "../../assets/images/metamask.svg";

const ConnectDialog = ({
  showConnectDialog,
  closeConnectWalletDialog,
}: {
  showConnectDialog: boolean;
  closeConnectWalletDialog: Function;
}) => {
  const connectors = useConnectors();

  const connectWallet = async (connector: Connector) => {
    await connector.connect();

    closeConnectWalletDialog();
  };

  const availableConnectors = connectors
    .map((connector) => {
      let connectorImage = connector.icon;

      if (connector.name === "MetaMask") {
        connectorImage = metamaskImage;
      }

      return { ...connector, icon: connectorImage };
    })
    .filter((connector) => connector.name !== "Injected");

  return (
    <PrimaryDialog
      isOpen={showConnectDialog}
      onClose={() => closeConnectWalletDialog()}
    >
      <div className="tw:w-130 tw:text-white tw:bg-black-100  tw:rounded-lg tw:border tw:border-gray-200 tw:p-6 tw:pt-8 tw:relative tw:flex tw:flex-col tw:items-center tw:justify-center tw:gap-5">
        <button
          className="tw:absolute tw:top-4 tw:right-6 tw:text-white tw:flex tw:flex-col tw:items-center tw:justify-center"
          onClick={() => closeConnectWalletDialog()}
        >
          <i className="bx bx-x tw:text-xl"></i>
        </button>
        <h3 className="tw:text-xl tw:text-white">Connect</h3>
        <div className="tw:w-full tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-2">
          {availableConnectors.map((connector) => {
            return (
              <button
                className="tw:h-13 tw:w-full tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-3 tw:py-4 tw:px-6 tw:bg-gray-200 tw:rounded-lg tw:text-white tw:transition-all tw:duration-150 tw:ease-linear tw:hover:bg-gray-300 tw:text-sm"
                key={connector.name}
                onClick={() => connectWallet(connector)}
              >
                <img
                  src={connector.icon}
                  alt={connector.name}
                  className="tw:size-5"
                />
                <span> {connector.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </PrimaryDialog>
  );
};

export default ConnectDialog;
