import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/products.model';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(items: Product.Product[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.productName.toLocaleLowerCase().includes(searchText);
    });
  }
}
