import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/products.model';

@Pipe({
  name: 'sortList'
})
export class SortPipe implements PipeTransform {

  transform(array: Product.Product[], value: string): any[] {
    if (value == '-1') {
      return array;
    }
    if(value === 'price'){
      array.sort((a: any, b: any) =>{
        return (a.price-(a.price*a.sale.salePersent/100))-(b.price-(b.price*b.sale.salePersent/100))
      });
    }
    array.sort(function (a: any, b: any) {
      if (typeof a[value] === 'number') {
        return a[value] - b[value];
      }

      return (<string>a[value]).localeCompare(<string>b[value]);
    });

    return array;
  }
}
