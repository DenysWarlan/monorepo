import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayJoin',
  standalone: true,
})
export class ArrayJoinPipe implements PipeTransform {
  transform(value: string[]): string {
    return value.join(',');
  }
}
