import { OnDestroy } from "@angular/core";
import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

export class AbstractFormGroupExt<T = any> implements ControlValueAccessor
, Validator, OnDestroy  {

  constructor(
    public errorMessage: string = 'Form part not valid',
  ) {}

  public _onTouched: () => {};
  _form!: FormGroup;
  public _destroy$: Subject<void> = new Subject<void>();
  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }
  public writeValue(value: any): void {
    if (value) {
      this._form.patchValue(value);
      // this._form.setValue(value);
    }
  }
  public registerOnChange(fn: any): void {
    this._form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(fn);
  }
  public registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  public setDisabledState?(_isDisabled: boolean): void {
    if(_isDisabled) {
      this._form.disable();
    } else {
      this._form.enable();
    }
  }
  public onInputBlurred(): void {
    this._onTouched();
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this._form.valid ? null : {
      invalidForm: {
        valid: false,
        message: this.errorMessage
      }
    };
  }

  isValid( name: string ): boolean {
    let control = null;
    if (this._form) {
      control = this._form.get(name);
    }
    if (control) {
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }
}
