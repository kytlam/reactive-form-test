import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from "@angular/core";
import { NumberboxComponent } from "../component/dynamic-form-fields/numberbox/numberbox.component";
import { TextboxComponent } from "../component/dynamic-form-fields/textbox/textbox.component";


const components: {[type: string]: Type<any>} = {
  textbox: TextboxComponent,
  numberbox: NumberboxComponent,
  // datetimebox: DatetimeboxComponent,
  // textareabox: TextareaboxComponent,
  // customdropdownbox: CustomDropdownboxComponent,
  // selectbox: SelectBoxComponent,
  // repeatingbox: RepeatingboxComponent
};

@Directive({
  selector: '[dynamicFormFiled]',
  
})
export class DynamicFormFieldsDirective implements OnChanges, OnInit {
  @Input() formFieldConfig!: any;
  @Input() globalDisable: boolean = false;
  @Input() data!:any;
  component!: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }

  ngOnChanges() {
    if (this.component) {
      this.setInstance();
    }
  }
  ngOnInit() {
    console.log("ngOnInit");
    console.log(this.formFieldConfig.controlType);
    console.log(components[this.formFieldConfig.controlType]);
    if (!components[this.formFieldConfig.controlType]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.formFieldConfig.controlType}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<any>(components[this.formFieldConfig.controlType]);
    this.component = this.container.createComponent(component);
    this.setInstance();
  }

  setInstance = () => {
    this.component.instance.formFieldConfig = this.formFieldConfig;
    // this.component.instance._form = this._form;
    this.component.instance.globalDisable = this.globalDisable;
    this.component.instance.data  = this.data;

  }
}