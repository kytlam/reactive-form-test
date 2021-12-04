import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootFormComponent } from './page/root-form/root-form.component';
import { DynamicFormComponent } from './component/dynamic-form/dynamic-form.component';
import { TextboxComponent } from './component/dynamic-form-fields/textbox/textbox.component';
import { DynamicFormFieldsDirective } from './directive/dynamic-form-fields.directive';
import { DxTextBoxModule, DxNumberBoxModule } from 'devextreme-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldLabelUiComponent } from './component/field-label-ui/field-label-ui.component';
import { NumberboxComponent } from './component/dynamic-form-fields/numberbox/numberbox.component';


@NgModule({
  declarations: [RootFormComponent, DynamicFormComponent, TextboxComponent, DynamicFormFieldsDirective, FieldLabelUiComponent, NumberboxComponent],
  imports: [
    CommonModule, DxTextBoxModule, DxNumberBoxModule, ReactiveFormsModule, FormsModule
  ],
  exports: [
    RootFormComponent,TextboxComponent
  ]
})
export class OrderFormModule { }
