import TotalTradesByCoin from "../components/TradeDistribution/TotalTradesByCoin";

const TradeDistribution = () => {
  return (
    <div className="tw:w-full tw:flex tw:flex-col tw:items-center tw:justify-center">
      <div className="tw:p-8 tw:w-full tw:max-w-328 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-8">
        <TotalTradesByCoin />
      </div>
    </div>
  );
};

export default TradeDistribution;
