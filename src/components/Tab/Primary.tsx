import { useEffect, useRef, useState } from "react";

interface PrimaryTabProps {
  tabs: string[];
  currentTab: number;
  changeCurrentTab: Function;
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
    if (tabRef.current) {
      const tabChildNodes = [...tabRef.current.childNodes];

      const tabNodes = tabChildNodes.slice(0, tabChildNodes.length - 1);

      const currentNode: HTMLElement = tabNodes[
        currentTab
      ] as unknown as HTMLElement;

      const currentTabWidth = currentNode.offsetWidth;

      const activeTabWidth = `${currentTabWidth}px`;
      let activeTabPositionLeft = "0px";

      if (currentTab === 0) {
        activeTabPositionLeft = "0px";
      } else {
        const tabNodesBeforeCurrentTab = tabNodes.slice(
          0,
          currentTab,
        ) as unknown as HTMLElement[];

        let positionLeft = 0;

        tabNodesBeforeCurrentTab.forEach((node) => {
          positionLeft += node.offsetWidth;
        });

        activeTabPositionLeft = `${positionLeft}px`;
      }

      setActiveTabStyle({
        left: activeTabPositionLeft,
        width: activeTabWidth,
      });
    }
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
