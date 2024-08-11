import { Observable } from "rxjs";
import { SupportedCurrencyResponse } from "../../../http/types/supported-currency.";
import { ConvertResponse } from "../../../http/types/convert-response.";
export interface ConversionParams {
  base: string;
  target: string;
  amount: number;
}
export interface SelectorWidgetDataProvider {
  readonly options$: Observable<SupportedCurrencyResponse>;
  conversionResult$: Observable<ConvertResponse>
  setConversion(params: ConversionParams): void;
}