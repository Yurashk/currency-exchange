import { Component, OnInit } from '@angular/core';
import { Currency } from '../interfaces';
import { Observable } from 'rxjs';
import { CurrencyService } from '../services/currency.service';
import { ChangeMainCurrencyService } from '../services/change-main-currency.service';
import { ICONS } from '../currency-icons';


@Component({
	selector: 'app-currency-exchange-main',
	templateUrl: './currency-exchange-main.component.html',
	styleUrls: [ './currency-exchange-main.component.css' ]
})
export class CurrencyExchangeMainComponent implements OnInit {
	currencyInfo$: Observable<Currency>;
	selectedMainCurrency: string = '';
	exchangeAmountFrom: string = '';
	exchangeAmountTo: string = '';
	currencyIconsPath = ICONS;
	constructor(private currencyService: CurrencyService, private changeMainCurrencyService: ChangeMainCurrencyService) {
		this.currencyInfo$ = this.currencyService.allCurrencyChanged;

	}

	ngOnInit(): void {
		this.changeMainCurrencyService.currentCurrencyChanged.subscribe(res => {
			this.selectedMainCurrency = res;
		});
	}

	setMainCurrency(value: string) {
		this.changeMainCurrencyService.changeMainCurrency(value);
	}

	setNewAmountFrom(value: string) {
		this.exchangeAmountFrom='';
		this.exchangeAmountFrom = value;
	}

	setNewAmountTo(value: string) {
		this.exchangeAmountTo='';
		this.exchangeAmountTo = value;
	}
}
