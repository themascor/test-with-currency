import { inject, Injectable } from "@angular/core";
import { SummaryWidgetDataProvider } from "../summary/types/summary-widget-data-provider";
import {
  ChartWidgetDataProvider,
} from "../chart/types/chart-widget-data-provider";
import {
  ConversionParams,
  SelectorWidgetDataProvider,
} from "../selector/types/selector-widget-data-provider";
import { SupportedCurrencyResponse } from "../../http/types/supported-currency.";
import { Subject, Observable, switchMap, shareReplay } from "rxjs";
import { CurrencyHttpService } from "../../http/currency-http.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ConvertResponse } from "../../http/types/convert-response.";

@Injectable()
export class StatisticWidgetsAggregatorService
  implements
    SummaryWidgetDataProvider,
    ChartWidgetDataProvider,
    SelectorWidgetDataProvider
{
  private currencyHttp = inject(CurrencyHttpService);

  private readonly _conversion$ = new Subject<ConversionParams>();
  private readonly _course$ = new Subject<string>();
  public get summaryData$(): Observable<ConvertResponse> {
    return this.conversionResult$;
  }
  public readonly conversionResult$ = this._conversion$.pipe(
    switchMap((params) => this.currencyHttp.convert(params)),
    takeUntilDestroyed()
  );
  public readonly courseResponse = this._course$.pipe(
    switchMap((base) => this.currencyHttp.latest(base)),
    shareReplay(),
    takeUntilDestroyed()
  );

  public get options$(): Observable<SupportedCurrencyResponse> {
    return this.currencyHttp.getSupportedCurrency().pipe(takeUntilDestroyed());
  }
  updateCourse(base: string): void {
    this._course$.next(base);
  }
  setConversion(params: ConversionParams): void {
    this._conversion$.next(params);
  }
}
