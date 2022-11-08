export interface CurrencyModel {
	base: string;
	rates: Currency;

}

export interface Currency {
	EUR: string;
	USD: string;
	UAH: string;
}

export interface currencyIcons {
	name: string;
	url: string
}
