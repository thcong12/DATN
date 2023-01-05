import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tohtml'
})
export class TohtmlPipe implements PipeTransform {

  transform(string: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
