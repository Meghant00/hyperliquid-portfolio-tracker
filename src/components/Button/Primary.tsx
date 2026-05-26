import type { ComponentPropsWithoutRef } from "react";

interface PrimaryButtonProps extends ComponentPropsWithoutRef<"button"> {
  title: string;
  isPrimary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  widthClass?: string;
  heightClass?: string;
  roundedClass?: string;
  textSizeClass?: string;
  paddingClass?: string;
}

const PrimaryButton = ({
  title,
  isPrimary = true,
  disabled = false,
  loading = false,
  widthClass = "tw:w-full",
  heightClass = "tw:h-8",
  roundedClass = "tw:rounded-lg",
  textSizeClass = "tw:text-xs tw:font-medium",
  paddingClass = "tw:px-4",
  onClick,
}: PrimaryButtonProps) => {
  const primaryClass =
    "tw:bg-turquoise-100 tw:text-black tw:hover:bg-aquamarine tw:disabled:bg-aquamarine";
  const secondaryClass =
    "tw:bg-transparent tw:text-mintcream-100 tw:border tw:border-gray-200 tw:hover:border-gray-100 tw:disabled:bg-transparent";
  const themeClass = isPrimary ? primaryClass : secondaryClass;

  return (
    <button
      className={`tw:flex tw:flex-col tw:items-center tw:justify-center tw:focus:outline-none tw:disabled:cursor-not-allowed ${themeClass} ${widthClass} ${heightClass} ${roundedClass} ${textSizeClass} ${paddingClass}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
