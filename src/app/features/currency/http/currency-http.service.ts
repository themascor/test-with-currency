import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "../../../../environments/environment";
import { API_VERSION_TOKEN } from "../../../core/http/api-version/api-version-token";
import { SupportedCurrencyResponse } from "./types/supported-currency.";
import { SUPPORTED_CURRENCY_MOCK } from "./mock/supported-currency.mock";
import { ConvertResponse } from "./types/convert-response.";
import { HistoryResponse } from "./types/history-response.";
import { CourseResponse } from "./types/course-response";

@Injectable()
export class CurrencyHttpService {
  private readonly http = inject(HttpClient);
  private readonly apiVersion = inject(API_VERSION_TOKEN).main;
  private root = `${environment.URI}/${this.apiVersion}/${environment.API_KEY}`;
  constructor() {}

  public convert({
    base,
    target,
    amount,
  }: {
    base: string;
    target: string;
    amount: number;
  }): Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(
      `${this.root}/pair/${base}/${target}/${amount}`
    );
  }
  public history({
    currency,
    year,
    month,
    day,
  }: {
    currency: string;
    year: number;
    month: number;
    day: number;
  }): Observable<HistoryResponse> {
    return this.http.get<HistoryResponse>(
      `${this.root}/history/${currency}/${year}/${month}/${day}`
    );
  }
  public latest(baseCurrency: string): Observable<CourseResponse> {
    return this.http.get<CourseResponse>(
      `${this.root}/latest/${baseCurrency}`
    );
  }
  public getSupportedCurrency(): Observable<SupportedCurrencyResponse> {
    return of(SUPPORTED_CURRENCY_MOCK);
  }
}
