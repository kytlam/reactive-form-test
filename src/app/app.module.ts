import { OrderFormModule } from './modules/order-form/order-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TextboxComponent } from './modules/order-form/component/dynamic-form-fields/textbox/textbox.component';
import { NumberboxComponent } from './modules/order-form/component/dynamic-form-fields/numberbox/numberbox.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrderFormModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TextboxComponent,
    NumberboxComponent
  ]
})
export class AppModule { }
