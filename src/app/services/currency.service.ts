import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CurrencyModel } from '../interfaces';
import { ChangeMainCurrencyService } from './change-main-currency.service';

@Injectable({
	providedIn: 'root'
})
export class CurrencyService implements OnDestroy {
	private allCurrenciesPrice = new Subject<any>();
	allCurrencyChanged = this.allCurrenciesPrice.asObservable();
	currentCurrencyValue: string = '';

	constructor(private http: HttpClient, private changeMainCurrencyService: ChangeMainCurrencyService) {
		this.changeMainCurrencyService.currentCurrencyChanged.subscribe(res => {
			this.currentCurrencyValue = res;
			this.getAllCurrenciesPrice().subscribe(res => {
				this.allCurrenciesPrice.next(res);
			});
		});
	}

	getAllCurrenciesPrice(): Observable<any> {
		return this.http.get<CurrencyModel>(environment.baseUrl, { params: { 'base': this.currentCurrencyValue } })
			.pipe(map((response: any) => {
				const allowed = [ 'UAH', 'EUR', 'USD' ];
				for (const property in response.rates) {
					if (!allowed.includes(property)) {
						delete response.rates[property];
					}
				}
				return response.rates;
			}));

	}

	ngOnDestroy() {
		this.allCurrenciesPrice.unsubscribe();
	}
}
