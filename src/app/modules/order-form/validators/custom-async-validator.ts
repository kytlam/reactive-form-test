export class CustomAsyncValidator {
}
import { AsyncValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { mapTo, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import 'rxjs/add/observable/of';

export function AsyncValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const test = Observable.of(null);
    if (control.value) {
      if (control.value === 1 || control.value === 2 || control.value === '1' || control.value === '2') {
        return test.pipe(mapTo({ AlreadyExists: 'not valid' }), delay(1000));
      }
    }
    return test;
  };
}
