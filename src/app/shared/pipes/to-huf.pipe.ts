import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toHuf'
})
export class ToHufPipe implements PipeTransform {

  transform(value: string, showInHuf: boolean): string {
    if (!value) return value;

    const [amount, currency] = value.split(' ');

    if (currency === '$' && showInHuf) {
      const hufAmount = (parseFloat(amount) * 380).toFixed(0);
      return `${hufAmount} Ft`;
    }

    return value;
  }
}