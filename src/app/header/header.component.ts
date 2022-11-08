import { Component } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { Observable } from 'rxjs';
import { ChangeMainCurrencyService } from '../services/change-main-currency.service';
import { Currency, currencyIcons } from '../interfaces';
import { ICONS } from '../currency-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent {
	currencyInfo$: Observable<Currency>;
	currencyIconsPath = ICONS;

	constructor(private currencyService: CurrencyService, private changeMainCurrencyService: ChangeMainCurrencyService) {
		this.currencyInfo$ = currencyService.allCurrencyChanged;
	}

	returnIcon(currencyShortCut: string) {
		let a: currencyIcons[] = this.currencyIconsPath.filter(x => {
			return x.name === currencyShortCut;
		});
		return a[0].url;
	}

	changeCurrentCurrency(mainCurrency: string) {
		this.changeMainCurrencyService.changeMainCurrency(mainCurrency);
	}
}
