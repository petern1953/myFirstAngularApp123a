import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prefix'
})
export class PrefixPipe implements PipeTransform {

  transform(value: any, pre: string = 'Mr.'): any {
    return `${pre} ${value}`;
  }

}
