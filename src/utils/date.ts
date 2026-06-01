export const formatDateInYYYYMMDDDD = (date: Date | number | string) => {
  const tempDate = new Date(date); // April 26, 2026

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const parts = formatter.formatToParts(tempDate);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;

  const finalResult = `${year} ${month} ${day}`;

  return finalResult;
};
