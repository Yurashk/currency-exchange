import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ChangeMainCurrencyService implements OnDestroy {
	private currentCurrency = new BehaviorSubject<string>('UAH');
	public currentCurrencyChanged = this.currentCurrency.asObservable();

	constructor() {
	}

	changeMainCurrency(newMainCurrency: string) {
		this.currentCurrency.next(newMainCurrency);
	}

	ngOnDestroy() {
		this.currentCurrency.unsubscribe();
	}
}
