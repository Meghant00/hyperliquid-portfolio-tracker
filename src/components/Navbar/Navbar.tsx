import ConnectWalletButton from "../Wallet/ConnectButton";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <div className="tw:w-full tw:h-14 tw:p-2.5 tw:bg-black-200 tw:sticky tw:top-0 tw:flex tw:flex-row tw:items-center tw:justify-between tw:gap-4">
      <div className="">
        <button
          className="tw:flex tw:flex-col tw:items-center tw:justify-center tw:xl:hidden"
          onClick={() => toggleSidebar()}
        >
          <i className="bx bx-menu tw:text-white tw:text-xl"></i>
        </button>
      </div>
      <ConnectWalletButton />
    </div>
  );
};

export default Navbar;
