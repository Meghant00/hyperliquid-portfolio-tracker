import { useEffect, useRef, useState } from "react";

interface PrimaryTabProps {
  tabs: string[];
  currentTab: number;
  changeCurrentTab: (index: number) => void;
  widthClass?: string;
  heightClass?: string;
  tabPaddingClass?: string;
}

export const PrimaryTab = ({
  tabs,
  currentTab = 0,
  changeCurrentTab,
  widthClass = "tw:w-full",
  heightClass = "tw:h-9",
  tabPaddingClass = "tw:px-3",
}: PrimaryTabProps) => {
  const tabRef = useRef<HTMLDivElement | null>(null);

  const activeTabClass = "tw:text-white!";

  const [activeTabStyle, setActiveTabStyle] = useState({
    left: "0px",
    width: "0px",
  });

  const tabButtonRefs = useRef<HTMLButtonElement[] | null[]>([]);

  useEffect(() => {
    setActiveTabWidthAndPosition();

    return () => {
      setActiveTabStyle({
        left: "0px",
        width: "0px",
      });
    };
  }, [currentTab]);

  const setActiveTabWidthAndPosition = () => {
    const currentButton = tabButtonRefs.current[currentTab];

    if (!currentButton) {
      return;
    }

    setActiveTabStyle({
      left: `${currentButton.offsetLeft}px`,
      width: `${currentButton.offsetWidth}px`,
    });
  };

  return (
    <div
      className={`tw:border-b tw:border-b-gray-200 tw:flex tw:flex-row tw:items-center tw:justify-start tw:gap-0 tw:relative ${widthClass} ${heightClass}`}
      ref={tabRef}
    >
      {tabs.map((tab, index) => {
        return (
          <button
            className={`tw:w-fit tw:h-full tw:text-xs tw:text-gray-100 tw:flex tw:flex-col tw:items-center tw:justify-center tw:transition-all tw:duration-150 tw:ease-linear tw:hover:text-white ${tabPaddingClass} ${index === currentTab ? activeTabClass : ""}`}
            key={tab}
            onClick={() => changeCurrentTab(index)}
            ref={(el) => {
              tabButtonRefs.current[index] = el;
            }}
          >
            {tab}
          </button>
        );
      })}
      <div
        className={`tw:absolute tw:bottom-0 tw:h-px tw:bg-aquamarine tw:transition-all tw:duration-150 tw:ease-linear`}
        style={activeTabStyle}
      ></div>
    </div>
  );
};

export default PrimaryTab;
