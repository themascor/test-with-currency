import { AsyncPipe, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractSelectorWidget } from "../models/abstract-selector-widget";
import { ReactiveFormsModule } from "@angular/forms";
import { CurrencyInputComponent } from "../../../../../core/ui/components/currency-input/currency-input.component";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-selector-two",
  standalone: true,
  imports: [NgIf, AsyncPipe, ReactiveFormsModule, MatIcon, CurrencyInputComponent],
  templateUrl: "./selector-two.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorTwoComponent extends AbstractSelectorWidget {}
