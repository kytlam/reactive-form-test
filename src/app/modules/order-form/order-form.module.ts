import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootFormComponent } from './page/root-form/root-form.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { TextboxComponent } from './component/dynamic-form-fields/textbox/textbox.component';
import { DynamicFormFieldsDirective } from './directive/dynamic-form-fields.directive';
import { DxTextBoxModule, DxNumberBoxModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RootFormComponent, DynamicFormComponent, TextboxComponent, DynamicFormFieldsDirective],
  imports: [
    CommonModule, DxTextBoxModule, DxNumberBoxModule, ReactiveFormsModule, FormsModule
  ],
  exports: [
    RootFormComponent
  ]
})
export class OrderFormModule { }
