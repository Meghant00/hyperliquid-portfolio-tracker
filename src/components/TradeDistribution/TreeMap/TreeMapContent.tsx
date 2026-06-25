import type { TreemapNode } from "recharts";

const TreeMapContent = (props: TreemapNode) => {
  const { width, height, x, y, name, depth, children, index } = props;

  const currentChildren = children && children[index];

  const totalTrades: number = (props.totalTrades as unknown as number) || 0;

  return (
    <g>
      <rect
        width={width}
        height={height}
        x={x}
        y={y}
        fill="#000"
        stroke="#fff"
      />
      {depth === 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name}
        </text>
      ) : null}

      <text
        x={x + width / 2}
        y={y + height / 2 + (7 + 14 + 8)}
        textAnchor="middle"
        fill="#fff"
        fontSize={14}
      >
        Total Trades: {totalTrades}
      </text>
    </g>
  );
};

export default TreeMapContent;
