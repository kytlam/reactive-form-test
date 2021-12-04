import { JsonCallService } from './../../services/json-call.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { AsyncValidator, SyncValidator } from '../../validators/custom-async-validator';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['./root-form.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootFormComponent implements OnInit,OnDestroy {
  rootForm: FormGroup;
  jsonFormSchema: any[];
  get FormSchemaKey():string[] { return Object.keys(this.jsonFormSchema); }
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef
    , private jsonCall : JsonCallService) { }

  ngOnInit(): void {
    this.jsonCall.getJsonFile("json-forms/test-form").subscribe(res => {
      this.jsonFormSchema = res.schema;
      this.buildForm();
    })
  }

  buildForm() {
    this._createFormGroup();
    this._setupObservables();
  }

  _createFormGroup() {
    this.rootForm = this.fb.group({});
    Object.keys(this.jsonFormSchema).forEach((key:string) => {
      let group = this._createGroup(key);
      this.rootForm.addControl(key, group);
    });
    console.log("xxxxx" , this.jsonFormSchema);
    // this.rootForm.addControl('numberbox', this.fb.control({ disabled: false, value: null }, null, [AsyncValidator()]));
    // this.rootForm.addControl('textbox', this.fb.control({ disabled: false, value: null }, null, [AsyncValidator()]));
  }

  _createGroup = (key:string): FormGroup => {
    const group = this.fb.group({});
    this.jsonFormSchema[key].filter(({controlType}) => controlType !== "button")
      .forEach((element: any) => {
      group.addControl(element.name, this._createControl(element) )
    });
    return group
  }

  _createControl = (config: any):FormControl | FormArray  => {
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
  isValid(groupKey: string, name: string ): any {
    let control = null;
    if (this.rootForm) {
      let subControl = this.rootForm.get(groupKey) as FormControl;
      if (subControl) {
        control = subControl.get(name);
      }
    }
    if (control) {
      console.log("isValid: ", control)
      return control.valid || !control.touched;
    } else {
      return true;
    }
  }

  private _setupObservables = (): void => {
    this.rootForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      console.log(" value  changed ", value);
      this.changeDetectorRef.detectChanges;
      // if (this._onChange) {
      //   this._onChange(value);
      // }
    });
  }
}
function bufferCount(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

