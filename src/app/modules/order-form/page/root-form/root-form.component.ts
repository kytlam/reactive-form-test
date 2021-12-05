import { JsonCallService } from './../../services/json-call.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
export class RootFormComponent implements OnInit, OnDestroy {
  rootForm: FormGroup;
  jsonRootFormSchema: any;

  data: any = {
    basic: {
      numberbox: 11,
      textbox: "text"
    }
  }
  get FormSchemaKey():string[] { return Object.keys(this.jsonRootFormSchema); }
  SubFormSchema(key: string):any[] { return this.jsonRootFormSchema[key] }
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef
    , private jsonCall : JsonCallService) { }

  ngOnInit(): void {
    this.jsonCall.getJsonFile("json-forms/test-form").subscribe(res => {
      this.jsonRootFormSchema = res.schema;
      this.buildForm();
    })
  }

  buildForm() {
    this._createFormGroup();
    this._setupObservables();
  }

  _createFormGroup() {
    this.rootForm = this.fb.group({
      basic: [null, Validators.required]
    });
    // Object.keys(this.jsonRootFormSchema).forEach((key:string) => {
    //   this.rootForm.addControl(key, this.fb.group({}));
    // });
    console.log("root form ",this.rootForm)
    setTimeout(_ => { this.rootForm.patchValue(this.data) },50)
  }

  ngOnDestroy() {
    if (this._destroy$ && !this._destroy$.closed) {
      this._destroy$.next();
      this._destroy$.complete();
    }
  }

  private _setupObservables = (): void => {
    this.rootForm.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      console.log("_setupObservables value  changed ", value);
      this.changeDetectorRef.detectChanges;
    });
  }

  formDataChanges = (value: {[name: string]: any}) => {
  }
//https://github.com/myndpm/open-source/tree/master/libs/forms
//https://www.digitalocean.com/community/tutorials/angular-reactive-forms-formarray-dynamic-fields
}
