import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Currency, currencyIcons } from '../../interfaces';
import { debounceTime, retry, Subject } from 'rxjs';
import { CurrencyService } from '../../services/currency.service';

@Component({
	selector: 'app-change-to',
	templateUrl: './change-to.component.html',
	styleUrls: [ './change-to.component.css' ]
})
export class ChangeToComponent implements OnInit,OnDestroy {
	@Input() currencyIconsPath: currencyIcons[] | undefined;
	@Input() selectedOption: string | undefined;
	@Input() exchangeAmount: string | undefined;
	@Output() mainCurrency = new EventEmitter<string>();
	@Output() currencyAmountChange = new EventEmitter<string>();

	ngOnChanges() {
		this.currentAmount = this.recountAmount(false, this.exchangeAmount?this.exchangeAmount:'');
	}

	currency: Currency | undefined;
	currentAmount: string | undefined = '';
	selectedCurrency: string = 'USD';
	amountUpdate = new Subject<string>();

	constructor(private currencyService: CurrencyService) {
		currencyService.allCurrencyChanged.subscribe(res => {
			this.currency = res;
			this.currentAmount = this.recountAmount(false, this.exchangeAmount);
		});
	}
	ngOnInit() {
		this.amountUpdate.pipe(
			debounceTime(300),retry())
			.subscribe((value: any) => {
				value =  this.selectedOption!==this.selectedCurrency ? this.recountAmount(true, value) : value;
				this.currencyAmountChange.emit(value);
			});
	}

	recountAmount(send: boolean, amount: string) {
		if(this.selectedOption===this.selectedCurrency)
			return this.exchangeAmount
		let i = !this.currency ? 0 : this.currency[this.selectedCurrency];
		return send ? ((Number(amount) / parseFloat(i))).toString() : (Number(amount) * (i)).toString();
	}

	setMainCurrency(value: string) {
		this.selectedCurrency = value;
		this.currentAmount = this.recountAmount(false, this.exchangeAmount);
	}

	ngOnDestroy(): void {
		this.amountUpdate.unsubscribe();
	}
}
