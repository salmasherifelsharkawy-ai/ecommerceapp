export const USD_TO_EGP = 50; // change this if you want a different rate

const egpFormatter = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  maximumFractionDigits: 2
});

export function usdToEgp(usd) {
  const n = Number(usd);
  if (!Number.isFinite(n)) return 0;
  return n * USD_TO_EGP;
}

export function formatEgpFromUsd(usd) {
  return egpFormatter.format(usdToEgp(usd));
}

