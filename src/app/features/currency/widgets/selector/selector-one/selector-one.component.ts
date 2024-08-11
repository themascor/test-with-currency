import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractSelectorWidget } from '../models/abstract-selector-widget';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyInputComponent } from '../../../../../core/ui/components/currency-input/currency-input.component';


@Component({
  selector: 'app-selector-one',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    CurrencyInputComponent,
  ],
  templateUrl: './selector-one.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorOneComponent extends AbstractSelectorWidget {
  
}
