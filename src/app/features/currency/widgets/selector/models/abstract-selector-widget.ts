import { inject } from "@angular/core";
import { SELECTOR_WIDGET_DATA_PROVIDER_TOKEN } from "./selector-widget-token";
import { toSignal, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { filter, first, merge, Observable, switchMap } from "rxjs";
import { CurrencyAmount } from "../../../../../core/ui/components/currency-input/currancy-amount.tiype";
import { ConvertResponse } from "../../../http/types/convert-response.";
import { positiveCurrencyAmount } from "./validators/positive-currency-amount.valdator";
interface SelectorForm {
  firstPicker: FormControl<CurrencyAmount>;
  secondPicker: FormControl<CurrencyAmount>;
}

export abstract class AbstractSelectorWidget {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly dataProvider = inject(SELECTOR_WIDGET_DATA_PROVIDER_TOKEN, {
    skipSelf: true,
  });

  public readonly fg = this.formBuilder();
  public get first(): FormControl<CurrencyAmount> {
    return this.fg.controls.firstPicker;
  }
  public get second(): FormControl<CurrencyAmount> {
    return this.fg.controls.secondPicker;
  }
  public currencies$ = this.dataProvider.options$.pipe(first());

  constructor() {
    this.dataProvider.conversionResult$
      .pipe(takeUntilDestroyed())
      .subscribe((result) => this.onConversion(result));
    this.first.valueChanges
      .pipe(
      filter((_) => this.first.valid),
        takeUntilDestroyed()
      )
      .subscribe((val) => this.convert(val, this.second.value));
    this.second.valueChanges
      .pipe(
        filter((_) => this.second.valid),
        takeUntilDestroyed()
      )
      .subscribe((val) => this.convert(val, this.first.value));
  }

  private formBuilder(): FormGroup<SelectorForm> {
    return this.fb.group<SelectorForm>({
      firstPicker: new FormControl(
        { currency: "UAH", amount: 0 },
        { nonNullable: true, validators: [positiveCurrencyAmount()] }
      ),
      secondPicker: new FormControl(
        { currency: "USD", amount: 0 },
        { nonNullable: true, validators: [positiveCurrencyAmount()] }
      ),
    });
  }

  private convert(base: CurrencyAmount, target: CurrencyAmount): void {
    this.dataProvider.setConversion({
      base: base.currency,
      target: target.currency,
      amount: base.amount,
    });
  }

  private onConversion(result: ConvertResponse): void {
    const target = this.getTargetControlBy(result.target_code);
    if (!target) {
      throw new Error("Cant apply conversion result");
    }
    target.setValue(
      {
        currency: result.target_code,
        amount: result.conversion_result,
      },
      { emitEvent: false }
    );
  }

  private getTargetControlBy(
    currency: string
  ): FormControl<CurrencyAmount> | undefined {
    return Object.values(this.fg.controls).find(
      (control) =>
        (control as FormControl<CurrencyAmount>).value.currency === currency
    );
  }
}
