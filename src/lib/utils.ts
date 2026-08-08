export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
