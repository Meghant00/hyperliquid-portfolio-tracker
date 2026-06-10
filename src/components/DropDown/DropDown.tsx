import React, { createContext, useContext, useState } from "react";

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

  return (
    <DropDownContext.Provider
      value={{ isDropDownOpen, toggleDropDown, closeDropDown }}
    >
      <>{children}</>
    </DropDownContext.Provider>
  );
};

export const DropDownTrigger = ({ children }: SlotProps) => {
  const { toggleDropDown } = useDropDownContext();

  return <button onClick={() => toggleDropDown()}>{children}</button>;
};

export const DropDownMenu = ({ children }: SlotProps) => {
  const { isDropDownOpen } = useDropDownContext();

  if (!isDropDownOpen) return null;

  return (
    <div className="tw:flex tw:flex-col tw:items-start tw:justify-start">
      {children}
    </div>
  );
};

export default DropDown;
