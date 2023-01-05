import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  forkJoin,
  fromEvent,
  map,
  pluck,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { User } from 'src/app/shared/model/account.model';
import { Product } from 'src/app/shared/model/products.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';
import { ProductsService } from 'src/app/shared/service/products.service';
import { StoreService } from 'src/app/shared/service/store.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  public filterForm!: FormGroup;
  public selectedCountry: string ='' ;
  public aaa: any[] = [];
  public listProduct!: Product.Product[];
  public listCateglory!: Product.Categlory[];
  public listDeveloper!: Product.Developer[];
  public numberProduct: number = 16;
  public page: number = 1;
  public isLogin$: BehaviorSubject<boolean> = this.authsv.isLogin;
  public rangeValues: number[] = [20, 80];
  public sortOptions!: SelectItem[];
  public sortSelect: SelectItem = { label: 'All ', value: '-1' };
  @ViewChild('input') inputElement!: ElementRef;
  @ViewChild('numberPage') numberPage!: ElementRef;
  constructor(
    private productSv: ProductsService,
    private categlorySv: CategloryService,
    private developerSv: DevelopersService,
    private userSv: UserService,
    private storeSv: StoreService,
    private renderer: Renderer2,
    private authsv: AuthService,
    private router: Router,
    private formBd: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }
  public controlName = {
    value: 'value',
    listCateglory: 'listCateglory',
    developer: 'developer',
  };
  public getData() {
    const me = this;
    forkJoin({
      products: me.productSv.getProducts(),
      categlory: me.categlorySv.getCateglorys(),
      developer: me.developerSv.getDevelopers(),
    })
      .pipe(
        map(({ products, categlory, developer }) => {
          me.listProduct = [...products];
          me.listCateglory = [...categlory];
          me.listDeveloper = [...developer];
          me.setPage(products.length);
        })
      )
      .subscribe({ next: (_res) => {} });
  }
  public getProductDetail(id: string): void {
    const me = this;
    me.router.navigateByUrl('/products/detail/' + id);
  }
  public addCateglory(item: any) {
    const me = this;
    const a = me.categloryList.controls.map((cate) => {
      return cate.value._id;
    });
    if (a.includes(item._id)) {
      alert('asd');
    } else {
      me.categloryList.push(me.formBd.control(item));
      console.log(me.filterForm.value);
    }
  }
  public removeCateglory(id: any) {
    const me = this;
    me.categloryList.removeAt(id);
  }
  private regisSearchEvent(): void {
    const me = this;
    fromEvent(me.inputElement.nativeElement, 'keyup')
      .pipe(
        takeUntil(me.destroy$),
        pluck('target', 'value'),
        debounceTime(400),
        distinctUntilChanged<any>(),
        filter((value: string) => value.length > 3),
        switchMap((keyword) => {
          return me.storeSv.search(keyword).pipe(
            map((res) => {
              me.listProduct = res;
              me.setPage(res.length);
            })
          );
        })
      )
      .subscribe({ complete: () => {} });
  }

  public changePage(value: number) {
    const me = this;
    me.page = value;
  }
  public setPage(listProduct: number) {
    let numberOfPage = Math.ceil(listProduct / this.numberProduct);
    this.aaa = [];
    for (let i = 1; i <= numberOfPage; i++) {
      this.aaa.push(i);
    }
  }
  private initForm() {
    const me = this;
    me.filterForm = me.formBd.group({
      [me.controlName.value]: me.formBd.array([0, 100]),
      [me.controlName.listCateglory]: me.formBd.array([]),
      [me.controlName.developer]: [''],
    });
  }
  public submitForm() {
    const me = this;
    me.storeSv
      .filterProduct(me.filterForm.value)
      .pipe(
        map((res) => {
          me.listProduct = res;
          me.setPage(res.length);
          
        })
      )
      .subscribe({ complete: () => {} });
      console.log(me.filterForm.value);
  }
  get categloryList(): FormArray {
    const me = this;

    return me.filterForm.get(me.controlName.listCateglory) as FormArray;
  }
  get valuePrice(): FormArray {
    const me = this;
    return me.filterForm.get(me.controlName.value) as FormArray;
  }

  ngOnInit(): void {
    const me = this;
    me.getData();
    me.sortOptions = [
      { label: 'Release', value: 'updatedAt' },
      { label: 'Price High to Low', value: 'price' },
      { label: 'Price Low to High', value: '!price' },
      { label: 'Sort by Name', value: 'productName' },
    ];

    me.initForm();
  }
  ngAfterViewInit(): void {
    const me = this;
    me.regisSearchEvent();
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
