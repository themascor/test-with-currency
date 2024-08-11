import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractChartWidget } from '../models/abstract-chart-widget';
import { MatIcon } from '@angular/material/icon';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { CourseResponse } from '../../../http/types/course-response';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-chart-two',
  standalone: true,
  imports: [
    BaseChartDirective, NgIf, MatIcon, MatChipsModule
  ],
  templateUrl: './chart-two.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartTwoComponent extends AbstractChartWidget {
  public ngOnInit(): void {
    this.dataProvider.updateCourse("UAH");
  }
 
  override adapter(
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
          borderColor: "pink",
          backgroundColor: "rgba(25,200,255,0.3)",
        },
      ],
    };
  }
 }
