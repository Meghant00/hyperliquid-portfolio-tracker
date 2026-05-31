import { useState } from "react";
import PrimaryTab from "../../Tab/Primary";

const AccountHistory = () => {
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
    </div>
  );
};

export default AccountHistory;
