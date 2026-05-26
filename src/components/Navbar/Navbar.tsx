import ConnectWalletButton from "../Wallet/ConnectButton";

const Navbar = () => {
  return (
    <div className="tw:w-full tw:h-14 tw:p-2.5 tw:bg-black-200 tw:sticky tw:top-0 tw:flex tw:flex-row tw:items-center tw:justify-between tw:gap-4">
      <div className=""></div>
      <ConnectWalletButton />
    </div>
  );
};

export default Navbar;
