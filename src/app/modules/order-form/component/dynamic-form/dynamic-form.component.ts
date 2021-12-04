import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
    }
  ]
})
export class DynamicFormComponent implements ControlValueAccessor, OnInit, OnDestroy {

  _form!: FormGroup;
  @Input() jsonFormSchema!: any[];

  private _destroy$: Subject<void> = new Subject<void>();

  public onChange: (value: string) => void;
  public onTouched: () => void;

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

  public writeValue(value: any): void {
    if (value && value === "") {
      return;
    }

    if (value) {
      this._form.patchValue(value);
    }
  }

  public registerOnChange(fn: (value: any) => void): void {
    // this._form.valueChanges.subscribe(values => fn(values));
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(_isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    if(this.jsonFormSchema && this.jsonFormSchema.length > 0) {
      this.buildForm();
    }
  }

  buildForm() {
    this._createFormGroup();
    this._setupObservables();
  }

  _createFormGroup() {
    // this._form = this.fb.group({});
    this._form = this._createGroup();
    // Object.keys(this.jsonFormSchema).forEach((key:string) => {
    // this.jsonFormSchema.forEach((key:string) => {
    //   let group = this._createGroup(key);
    //   this._form.addControl(key, group);
    // });
    console.log("xxxxx" , this.jsonFormSchema);
    console.log("xxxxx" , this._form);
  }

  _createGroup = (): FormGroup => {
    const group = this.fb.group({});
    this.jsonFormSchema.filter(({controlType}) => controlType !== "button")
      .forEach((element: any) => {
      group.addControl(element.name, this._createControl(element) )
    });
    return group
  }

  _createControl = (config: any): FormControl | FormArray  => {
    const { disabled, validation, value } = config;
    // let validator = AsyncValidator();
    // return this.fb.control({ value: value, disabled: disabled } ,null, validator);
    let validator = SyncValidator();
    return this.fb.control({ value: value, disabled: disabled } , validator);
  }
  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  isValid(name: string ): any {
    console.log(" isValid: ", name)
    let control = null;
    if (this._form) {
      control= this._form.get(name) as FormControl;
    }
    if (control) {
      console.log(" isValid: ", control)
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }

  public onInputBlurred(): void {
    this.onTouched();
  }
  private _setupObservables = (): void => {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      console.log(" value  changed ", value);
      this.onChange(value);
      this.changeDetectorRef.detectChanges;
      // if (this._onChange) {
      //   this._onChange(value);
      // }
    });
  }
}
