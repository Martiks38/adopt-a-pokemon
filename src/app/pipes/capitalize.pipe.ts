import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from '../utils/capitalize';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | string[]): string | string[] {
    if (typeof value === 'string') {
      return capitalize(value);
    }

    let capitalizeValue: string[] = [];

    capitalizeValue = value.map((word) => {
      return capitalize(word);
    });

    return capitalizeValue;
  }
}
