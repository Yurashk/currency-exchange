import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Currency, currencyIcons } from '../../interfaces';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';

@Component({
	selector: 'app-change-from',
	templateUrl: './change-from.component.html',
	styleUrls: [ './change-from.component.css' ]
})
export class ChangeFromComponent implements OnDestroy {
	@Input() currencyIconsPath: currencyIcons[] | undefined;
	@Input() selectedOption: string | undefined;
	@Input() currencyInfo$: Observable<Currency> | undefined;
	@Input() exchangeAmount: string | undefined;
	@Output() mainCurrency = new EventEmitter<string>();
	@Output() currencyAmountChange = new EventEmitter<string>();

	amountUpdate = new Subject<string>();
	amount: number = 0;
	currentAmount: string | undefined = '';

	constructor() {
		this.amountUpdate.pipe(
			debounceTime(400),
			distinctUntilChanged())
			.subscribe((value: string) => {
				this.currencyAmountChange.emit(value);
			});
	}

	setMainCurrency(value: string) {
		this.mainCurrency.emit(value);
		this.currencyAmountChange.emit(this.exchangeAmount);
	}

	ngOnDestroy(): void {
		this.amountUpdate.unsubscribe();
	}
}
