export interface Currency {
  code: string;
  name: string;
  country: string;
}
export type SupportedCurrencyResponse = Currency[];
