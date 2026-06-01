import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import CustomTooltip from "./CustomToolTip";
import { useEffect, useState } from "react";

const PortfolioChart = ({ data }: { data: [number, string][] }) => {
  const [parsedData, setParsedData] = useState<
    { time: number; value: string }[]
  >([]);

  useEffect(() => {
    parseData();
  }, [data]);

  const parseData = () => {
    if (!data || data.length === 0) {
      setParsedData([
        {
          time: Date.now(),
          value: "0",
        },
        {
          time: Date.now(),
          value: "0",
        },
      ]);

      return;
    }

    const tempParsedData = data.map((lineData) => {
      return {
        time: lineData[0],
        value: lineData[1],
      };
    });

    setParsedData([...tempParsedData]);
  };

  return (
    <div className="tw:w-full tw:pt-0 tw:px-2">
      <LineChart
        width="100%"
        height={180}
        data={parsedData}
        responsive
        accessibilityLayer={false}
        margin={{ bottom: 0, left: 0, top: 8, right: 0 }}
      >
        <YAxis
          tickCount={4}
          tick={{ fill: "#fff", fontSize: "12px" }}
          strokeWidth={2}
          orientation="left"
          width={35}
        />
        <Line
          dataKey={"value"}
          stroke="#fff"
          strokeWidth={2}
          dot={false}
          type={"step"}
          zIndex={999}
          activeDot={false}
          animationDuration={500}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#000",
            borderRadius: "8px",
            border: "none",
          }}
          itemStyle={{ color: "#fff" }}
          content={<CustomTooltip />}
        />
        <XAxis tick={false} dataKey={"time"} strokeWidth={2} />
      </LineChart>
    </div>
  );
};

export default PortfolioChart;
