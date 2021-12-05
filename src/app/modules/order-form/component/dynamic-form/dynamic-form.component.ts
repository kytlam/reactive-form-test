import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SyncValidator } from '../../validators/custom-async-validator';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicFormComponent, //forwardRef(() => DynamicFormComponent),
      multi: true
    }
  ]
})

export class DynamicFormComponent implements ControlValueAccessor, OnInit, OnDestroy {

  _form!: FormGroup;
  @Input() jsonFormSchema!: any[];
  private _destroy$: Subject<void> = new Subject<void>();

  disabled: boolean;

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

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
      this._form.addControl(element.name,  this._createControl(element) )
    });
    console.log("group: " , this._form);
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

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  public _onTouched: () => {};
  public _onChangeSub: Subscription;

  public registerOnChange(fn: any): void {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(fn);
  }

  public writeValue(value: any): void {
    if (value) {
      this._form.patchValue(value);
      // this._form.setValue(value);
    }
  }

  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(_isDisabled: boolean): void {
    if(_isDisabled) {
      this._form.disable();
    } else {
      this._form.enable();
    }
  }

  public onInputBlurred(): void {
    this._onTouched();
  }

}
