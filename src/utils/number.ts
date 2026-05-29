export const formatDecimals = (value: number, decimals: number = 2) => {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(value);
};

export const formatNumberToWord = (value: number, decimals: number = 2) => {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
};
