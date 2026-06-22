import { formatNumberToWord } from "../../../utils/number";

const TotalVolumeByCoin = ({
  totalVolumeInNumber,
  coin,
}: {
  totalVolumeInNumber: number;
  coin: string;
}) => {
  const totalVolume = formatNumberToWord(totalVolumeInNumber);

  return (
    <div className="tw:w-full  tw:rounded-xl tw:bg-black-200 tw:flex tw:flex-col tw:items-start tw:justify-start tw:gap-3 tw:p-4">
      <div className="tw:text-sm tw:font-medium tw:text-gray-100">
        Total {coin} Volume
      </div>
      <div className="tw:text-white tw:text-3xl">${totalVolume}</div>
    </div>
  );
};

export default TotalVolumeByCoin;
