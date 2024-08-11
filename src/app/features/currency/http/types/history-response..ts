export interface HistoryResponse {
  result: string;
  documentation: string;
  terms_of_use: string;
  year: number;
  month: number;
  day: number;
  base_code: string;
  conversion_rates: { [key in string]: number };
}
