import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Currency, currencyIcons } from '../../interfaces';
import { debounceTime, Observable, retry, Subject } from 'rxjs';

@Component({
	selector: 'app-change-from',
	templateUrl: './change-from.component.html',
	styleUrls: [ './change-from.component.css' ]
})
export class ChangeFromComponent implements OnInit,OnDestroy {
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
	}

	ngOnInit() {
		this.amountUpdate.pipe(
			debounceTime(300),
			retry()
		)
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
