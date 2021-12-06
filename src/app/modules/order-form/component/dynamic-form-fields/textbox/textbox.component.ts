import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractFormGroupExt } from '../../../extensions/abstract-form-group-ext';
import { SyncValidator } from '../../../validators/custom-async-validator';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextboxComponent),
      multi: true
    }
  ]
})
export class TextboxComponent extends AbstractFormGroupExt implements OnInit {
  @Input() fieldConfig: any;

  constructor(private fb: FormBuilder) { super(); }

  ngOnInit() { 
    if(this.fieldConfig) {
      this.buildForm();
    }
  }

  buildForm() {
    this._createFormGroup();
  }

  _createFormGroup() {
    this._form = this.fb.group({});
    this._form.addControl(this.fieldConfig.name,  this._createControl(this.fieldConfig) )
    console.log("group: " , this._form);
  }
  

  _createControl = (config: any): FormControl | FormArray  => {
    const { disabled, validation, value } = config;
    // let validator = AsyncValidator();
    // return this.fb.control({ value: value, disabled: disabled } ,null, validator);
    let validator = SyncValidator();
    return this.fb.control({ value: value, disabled: disabled } , validator);
  }

}
