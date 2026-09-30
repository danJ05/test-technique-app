const CURRENCY_LABEL = "FCFA";

const numberFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

export interface FormatCurrencyOptions {
  signed?: boolean;
}

export const formatCurrency = (amount: number, options: FormatCurrencyOptions = {}): string => {
  const formatted = `${numberFormatter.format(Math.abs(amount))} ${CURRENCY_LABEL}`;

  if (amount < 0) return `-${formatted}`;
  return options.signed ? `+${formatted}` : formatted;
};
