import { computed, inject, OnInit, Signal, signal } from "@angular/core";
import { CHART_WIDGET_DATA_PROVIDER_TOKEN } from "./chart-widget-token";
import { toSignal, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ChartConfiguration, ChartOptions } from "chart.js";
import { tap, filter, map } from "rxjs";
import { HistoryResponse } from "../../../http/types/history-response.";
import { CourseResponse } from "../../../http/types/course-response";

export abstract class AbstractChartWidget {
  public readonly dataProvider = inject(CHART_WIDGET_DATA_PROVIDER_TOKEN, {
    skipSelf: true,
  });
  public chartData!: Signal<ChartConfiguration<"bar">["data"]>;
  public isChartData = signal(false);
  public chartOptions: ChartOptions<"bar"> = {
    responsive: false,
  };
  public chartLegend = false;
  public usd = toSignal(
    this.dataProvider.courseResponse.pipe(
      map((res) => this.applyCourse(res, 'USD'))
    ),
    { initialValue: null }
  );
  public eur = toSignal(
    this.dataProvider.courseResponse.pipe(
      map((res) => this.applyCourse(res, 'EUR'))
    ),
    { initialValue: null }
  );
  constructor() {
    this.chartData = toSignal(
      this.dataProvider.courseResponse.pipe(
        tap((response) => this.isChartData.set(this.isData(response))),
        filter((response) => this.isData(response)),
        map((options) => this.adapter(options as CourseResponse)),
        takeUntilDestroyed()
      ),
      {
        initialValue: {
          labels: [],
          datasets: [],
        },
      }
    );
  }
  protected adapter(
    rangeResponse: CourseResponse
  ): ChartConfiguration<"bar">["data"] {
    const labels = Object.keys(rangeResponse.conversion_rates);
    const data = Object.values(rangeResponse.conversion_rates).map(
      (rate => this.applyRate(rate))
    );
    return {
      labels,
      datasets: [
        {
          data,
          label: rangeResponse.base_code,
          borderColor: "black",
          backgroundColor: "rgba(255,0,0,0.3)",
        },
      ],
    };
  }

  private isData(course: CourseResponse | null): boolean {
    return course !== null;
  }
  private applyCourse(course: CourseResponse | null, code: string): number | null  {
    const rate = course?.conversion_rates[code];
    if (!rate) {
      return null
    }
    return this.applyRate(rate) 
  }
  protected applyRate(rate: number): number {
    return 1 / rate 
  }
}
