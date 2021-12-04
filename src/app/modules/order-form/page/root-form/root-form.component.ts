import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { AsyncValidator } from '../../validators/custom-async-validator';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootFormComponent implements OnInit,OnDestroy {
  form: FormGroup;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._createFormGroup();

    this._setupObservables();

  }
  _createFormGroup() {
    this.form = this.fb.group({});
    this.form.addControl('numberbox', this.fb.control({ disabled: false, value: null }, null, [AsyncValidator()]));
    this.form.addControl('textbox', this.fb.control({ disabled: false, value: null }, null, [AsyncValidator()]));
  }
  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }
  isValid( name: string ): boolean {
    let control = null;
    if (this.form) {
      control = this.form.get(name);
    }
    if (control) {
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }
  
  private _setupObservables = (): void => {
    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      console.log(" value  changed ", value);
      // if (this._onChange) {
      //   this._onChange(value);
      // }
    });
  }

}
function bufferCount(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

