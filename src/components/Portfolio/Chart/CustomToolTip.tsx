import { formatDateInYYYYMMDDDD } from "../../../utils/date";
import { formatDecimals } from "../../../utils/number";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      time: number;
      value: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const rawData = payload[0].payload;

    return (
      <div className="tw:bg-black tw:px-1 tw:rounded-lg tw:text-xs">
        <p className="tw:whitespace-nowrap tw:m-0 tw:text-white">
          {formatDateInYYYYMMDDDD(rawData.time)}:{" "}
          {formatDecimals(Number(rawData.value), 2)}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
