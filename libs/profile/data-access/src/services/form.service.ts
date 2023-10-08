import {Injectable} from '@angular/core';
import { FormControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public setValidator(ctrl: FormControl, validator: ValidatorFn): void {
    ctrl.setValidators([validator]);
  }
  
  public resetValibator(ctrl: FormControl, validator: ValidatorFn): void{
    ctrl.removeValidators([validator]);
  }
}
