import React, { createContext, useContext, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

interface SlotProps {
  children: React.ReactNode;
}

interface IDropDownContext {
  isDropDownOpen: boolean;
  toggleDropDown: () => void;
  closeDropDown: () => void;
}

const DropDownContext = createContext<IDropDownContext | null>(null);

const useDropDownContext = () => {
  const context = useContext(DropDownContext);

  if (!context)
    throw new Error(
      "Dropdown sub-components must be used within a <Dropdown />",
    );

  return context;
};

const DropDown = ({ children }: SlotProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => setIsDropDownOpen((prev) => !prev);

  const closeDropDown = () => setIsDropDownOpen(false);

  const dropdownContainerRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(dropdownContainerRef, () => {
    setIsDropDownOpen(false);
  });

  return (
    <DropDownContext.Provider
      value={{ isDropDownOpen, toggleDropDown, closeDropDown }}
    >
      <div className="tw:relative" ref={dropdownContainerRef}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
};

const DropDownTrigger = ({ children }: SlotProps) => {
  const { toggleDropDown, isDropDownOpen } = useDropDownContext();

  return (
    <button
      className="tw:flex tw:flex-row tw:items-center tw:justify-between tw:gap-1 tw:group"
      onClick={() => toggleDropDown()}
    >
      {children}
      {isDropDownOpen ? (
        <i className="bx bx-chevron-up tw:group tw:text-lg tw:text-gray-200 tw:group-hover:text-gray-100"></i>
      ) : (
        <i className="bx bx-chevron-down tw:group tw:text-lg tw:text-gray-200 tw:group-hover:text-gray-100"></i>
      )}
    </button>
  );
};

const DropDownMenu = ({ children }: SlotProps) => {
  const { isDropDownOpen } = useDropDownContext();

  if (!isDropDownOpen) return null;

  return (
    <div className="tw:w-full tw:p-2.5 tw:flex tw:flex-col tw:items-start tw:justify-start tw:absolute tw:top-[110%] tw:rounded-lg tw:bg-hyperliquid-gray-200 tw:border-b-hyperliquid-gray-100">
      {children}
    </div>
  );
};

const DropDownItem = ({ children }: SlotProps) => {
  const { closeDropDown } = useDropDownContext();

  return (
    <div
      className="tw:cursor-pointer tw:w-full"
      onClick={() => closeDropDown()}
    >
      {children}
    </div>
  );
};

DropDown.Trigger = DropDownTrigger;
DropDown.Menu = DropDownMenu;
DropDown.Item = DropDownItem;

export default DropDown;
