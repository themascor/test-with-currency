import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CurrencyAmount } from "../../../../../../core/ui/components/currency-input/currancy-amount.tiype";

export function positiveCurrencyAmount(): ValidatorFn {
  return (
    control: AbstractControl<CurrencyAmount>
  ): ValidationErrors | null => {
    const value = control.value?.amount;
    const isNumber = typeof value === "number";
    const isPositive = isNumber && value >= 0;
    return isPositive ? null : { isPositive };
  };
}
