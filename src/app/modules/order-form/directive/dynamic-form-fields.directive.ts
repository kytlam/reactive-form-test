import { TextboxComponent } from './../component/dynamic-form-fields/textbox/textbox.component';
import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
  } from "@angular/core";

import { FormGroup } from "@angular/forms";
import { NumberboxComponent } from "../component/dynamic-form-fields/numberbox/numberbox.component";

const componentMapper = {
  numberbox: NumberboxComponent,
  textbox: TextboxComponent,
  };

@Directive({
  selector: '[appDynamicFormFields]'
})
export class DynamicFormFieldsDirective implements OnInit {
  @Input() _form: FormGroup
  @Input() fieldConfig: any;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef) { }
    ngOnInit() {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.fieldConfig.controlType]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.fieldConfig = this.fieldConfig;
        this.componentRef.instance._form = this._form;
    }
}
