import { Component } from '@angular/core';
import { CurrencyService } from './services/currency.service';
import { Observable, repeat } from 'rxjs';
import { Currency } from './interfaces';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	title = 'currency-exchange';
	currencyInfo$: Observable<Currency>;

	constructor(private currencyService: CurrencyService) {
		this.currencyInfo$ = currencyService.allCurrencyChanged;
	}

}
