import { useState } from "react";
import PrimaryTab from "../../Tab/Primary";
import PortfolioChart from "../Chart/Chart";

const AccountHistory = ({
  accountValueHistory,
  pnlHistory,
}: {
  accountValueHistory: [number, string][];
  pnlHistory: [number, string][];
}) => {
  const tabs = ["Account Value", "PNL"];

  const [currentTab, setCurrentTab] = useState(0);

  const changeCurrentTab = (tab: number) => {
    setCurrentTab(tab);
  };

  return (
    <div className="tw:w-full tw:h-full tw:rounded-xl tw:bg-black-200">
      <PrimaryTab
        tabs={tabs}
        currentTab={currentTab}
        changeCurrentTab={changeCurrentTab}
      />
      <div className="tw:p-3">
        <PortfolioChart
          data={currentTab === 0 ? accountValueHistory : pnlHistory}
        />
      </div>
    </div>
  );
};

export default AccountHistory;
