import { CommonModule, NgFor } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  Input,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from "@angular/forms";
import { CurrencyAmount } from "./currancy-amount.tiype";
import { Currency } from "../../../../features/currency/http/types/supported-currency.";
import { filter, takeUntil } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
interface SelectorForm {
  amount: FormControl<number | null>;
  currency: FormControl<string | null>;
}
@Component({
  selector: "app-currency-input",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgFor,
  ],
  template: `<form [formGroup]="fg">
    <mat-form-field>
      <mat-label>Amount</mat-label>
      <input type="number" min="0" matInput formControlName="amount" />
    </mat-form-field>
    <mat-form-field>
      <mat-label>Currency</mat-label>
      <mat-select formControlName="currency">
        @for (currency of currencies(); track currency.code) {
        <mat-option [value]="currency.code">
          {{ currency.code }} ({{ currency.country }})
        </mat-option>
        }
      </mat-select>
    </mat-form-field>
  </form>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyInputComponent implements ControlValueAccessor {
  public currencies = input.required<Currency[]>();

  public readonly fg = new FormGroup<SelectorForm>({
    amount: new FormControl<number | null>(null),
    currency: new FormControl<string | null>(null),
  });

  private onChange!: (value: CurrencyAmount) => void;
  private onTouched!: () => void;

  constructor() {
    this.fg.valueChanges
      .pipe(
        filter((partial) => this.isPartialComplete(partial)),
        takeUntilDestroyed()
      )
      .subscribe((v) => !!this.onChange && this.onChange(v as CurrencyAmount));
  }
  writeValue(obj: CurrencyAmount): void {
    this.fg.patchValue(obj, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.fg.disable() : this.fg.enable();
  }

  private isPartialComplete(
    partial: Partial<{
      amount: number | null;
      currency: string | null;
    }>
  ): boolean {
    return partial.amount !== null && partial.currency !== null;
  }
}
