import { Lang, Currency } from "@/types/currency";

export function formatCurrency(
  value: number,
  lang: Lang,
  currency: Currency
): string {
  return new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  }).format(value);
}
