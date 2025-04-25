import { baseUSDC } from "@daimo/contract";

export async function fetchUSDCBalance(toAddress: string): Promise<number> {
  const key = process.env.NEXT_PUBLIC_ALCHEMY_KEY;
  if (!key) throw new Error("Alchemy key not configured");

  const url = `https://base-mainnet.g.alchemy.com/v2/${key}`;
  const payload = {
    id: 1,
    jsonrpc: "2.0",
    method: "alchemy_getTokenBalances",
    params: [toAddress],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch balances: ${response.statusText}`);
  }

  const data = await response.json();
  const tokenBalances = data.result.tokenBalances;
  const usdcBalanceObj = tokenBalances.find(
    (tb: any) => tb.contractAddress.toLowerCase() === baseUSDC.token.toLowerCase(),
  );

  if (usdcBalanceObj) {
    const bi = BigInt(usdcBalanceObj.tokenBalance);
    return Number(bi) / 10 ** 6;
  }

  return 0;
}
