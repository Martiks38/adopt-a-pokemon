import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ListForm',
})
export class ListFormPipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (!Array.isArray(value)) return value;

    const formatter = new Intl.ListFormat('en', {
      style: 'long',
      type: 'conjunction',
    });

    return formatter.format(value);
  }
}
