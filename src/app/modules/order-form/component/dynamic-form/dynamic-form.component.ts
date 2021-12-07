import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AbstractFormGroupExt } from '../../extensions/abstract-form-group-ext';
import { SyncValidator } from '../../validators/custom-async-validator';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DynamicFormComponent),
      multi: true
    }
  ]
})

export class DynamicFormComponent extends AbstractFormGroupExt implements OnInit{

  @Input() jsonFormSchema!: any[];

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit() {
    if(this.jsonFormSchema && this.jsonFormSchema.length > 0) {
      this.buildForm();
    }
  }

  buildForm() {
    this._createFormGroup();
  }

  _createFormGroup() {
    this._form = this.fb.group({});
    this.jsonFormSchema.filter(({controlType}) => controlType !== "button")
      .forEach((element: any) => {
      // this._form.addControl(element.name,  this._createControl(element) )
      this._form.addControl(element.name, this.fb.control({ value: null }, SyncValidator()));
    });
    console.log("group-----------: " , this._form);
  }

  _createControl = (config: any): FormControl | FormArray  => {
    const { disabled, validation, value } = config;
    // let validator = AsyncValidator();
    // return this.fb.control({ value: value, disabled: disabled } ,null, validator);
    let validator = SyncValidator();
    return this.fb.control({ value: value, disabled: disabled } , validator);
  }

  isValid(name: string ): any {
    let control = null;
    if (this._form) {
      control= this._form.get(name) as FormControl;
    }
    if (control) {
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    control.markAsTouched({ onlySelf: true });
    });
  }


}
