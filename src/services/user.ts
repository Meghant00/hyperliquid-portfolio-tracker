import { infoClient } from "../hyperliquid/clients";

export const getUserFills = async ({
  address,
  signal,
}: {
  address: `0x${string}`;
  signal: AbortSignal;
}) => {
  try {
    const res = await infoClient.userFills(
      {
        user: address,
        aggregateByTime: true,
      },
      signal,
    );

    return res;
  } catch (error) {
    console.log(error);

    return [];
  }
};
