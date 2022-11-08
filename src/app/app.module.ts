import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyExchangeMainComponent } from './currency-exchange-main/currency-exchange-main.component';
import { ChangeFromComponent } from './currency-exchange-main/change-from/change-from.component';
import { ChangeToComponent } from './currency-exchange-main/change-to/change-to.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrencyExchangeMainComponent,
    ChangeFromComponent,
    ChangeToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
