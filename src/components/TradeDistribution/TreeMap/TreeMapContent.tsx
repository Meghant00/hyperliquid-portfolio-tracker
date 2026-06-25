import type { TreemapNode } from "recharts";

const TreeMapContent = (props: TreemapNode) => {
  const { width, height, x, y, name, depth } = props;

  const totalTrades: number = (props.totalTrades as unknown as number) || 0;

  const totalNumberOfProfit: number =
    (props.totalNumberOfProfit as unknown as number) || 0;
  const totalNumberOfLoss: number =
    (props.totalNumberOfLoss as unknown as number) || 0;

  let treeMapFillColor = "#1fa67d";

  const treeMapStrokeColor = "#273035";

  if (totalNumberOfLoss > totalNumberOfProfit) {
    treeMapFillColor = "#ed7088";
  }

  return (
    <g>
      <rect
        width={width}
        height={height}
        x={x}
        y={y}
        fill={treeMapFillColor}
        stroke={treeMapStrokeColor}
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill={treeMapStrokeColor}
          fontSize={14}
        >
          {name}
        </text>
      ) : null}

      <text
        x={x + width / 2}
        y={y + height / 2 + (7 + 14 + 8)}
        textAnchor="middle"
        fill={treeMapStrokeColor}
        fontSize={14}
      >
        Total Trades: {totalTrades}
      </text>
    </g>
  );
};

export default TreeMapContent;
