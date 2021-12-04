import { OrderFormModule } from './modules/order-form/order-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DxDataGridModule } from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DxDataGridModule,
    AppRoutingModule,
    OrderFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
