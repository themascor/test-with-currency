import { CommonModule, NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { AbstractChartWidget } from "../models/abstract-chart-widget";
import { BaseChartDirective } from "ng2-charts";
import { MatIcon } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";

@Component({
  selector: "app-chart-one",
  standalone: true,
  imports: [BaseChartDirective, NgIf, MatIcon, MatChipsModule],
  templateUrl: "./chart-one.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartOneComponent extends AbstractChartWidget {
  public ngOnInit(): void {
    this.dataProvider.updateCourse("UAH");
  }
}
