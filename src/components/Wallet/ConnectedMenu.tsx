import { useDisconnect } from "wagmi";
import DropDown from "../DropDown/DropDown";

const ConnectedMenu = ({ address }: { address: `0x${string}` }) => {
  const { mutate } = useDisconnect();

  const formattedWalletAddress = address
    ? address.slice(0, 6) +
      "..." +
      address.slice(address.length - 4, address.length)
    : "";

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <DropDown>
      <DropDown.Trigger hasBorder={true}>
        <span className="tw:text-xs tw:font-medium tw:text-mintcream-100">
          {formattedWalletAddress}
        </span>
      </DropDown.Trigger>
      <DropDown.Menu>
        <div className="tw:w-full tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-2">
          <DropDown.Item defaultClick={false}>
            <div className="tw:w-full tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-2 tw:h-6">
              <span className="tw:text-xs tw:font-medium tw:text-mintcream-100">
                {formattedWalletAddress}
              </span>
              <button
                className="tw:flex tw:flex-col tw:items-center tw:justify-center"
                onClick={() => copyWalletAddress()}
              >
                <i className="bx bx-copy tw:text-lg tw:text-turquoise-100 tw:transition-all tw:duration-150 tw:hover:text-aquamarine"></i>
              </button>
            </div>
          </DropDown.Item>
          <DropDown.Item>
            <div className="tw:w-full tw:border-t tw:border-t-hyperliquid-gray-100">
              <button
                className="tw:text-xs tw:text-turquoise-100 tw:hover:text-aquamarine"
                onClick={() => mutate()}
              >
                Disconnect
              </button>
            </div>
          </DropDown.Item>
        </div>
      </DropDown.Menu>
    </DropDown>
  );
};

export default ConnectedMenu;
