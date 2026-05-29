const TotalEquity = ({ totalEquity }: { totalEquity: string }) => {
  return (
    <div className="tw:w-full tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-gray-100">
        Total Equity
      </div>
      <div className="tw:text-white tw:text-3xl">${totalEquity}</div>
    </div>
  );
};

export default TotalEquity;
