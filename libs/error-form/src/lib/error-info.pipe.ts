import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from '@angular/forms';

@Pipe({
  name: 'errorInfo',
  standalone: true,
})
export class ErrorInfoPipe implements PipeTransform {
  private errors: {[key: string] : string} = {
    'required': 'is required',
    'minlength': 'error min length',
    'email': 'not valid',
  }

  public transform(value: ValidationErrors | null): string[]{
    if(!value){
      return null;
    }

    return Object.keys(value).map((key:string) => this.errors[key]);
  }
}
