import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { CategloryService } from 'src/app/shared/service/categlory.service';

@Component({
  selector: 'app-table-categlory-page',
  templateUrl: './table-categlory-page.component.html',
  styleUrls: ['./table-categlory-page.component.scss']
})
export class TableCategloryPageComponent extends BaseComponent implements OnInit {

  constructor(private cateSV: CategloryService, private formBd: FormBuilder) {
    super();
  }
  public categlorys!:Product.Categlory[];
  public categlory!: Product.Categlory;
  public createNew!: boolean;
  public option!: string[];
  public select!: string;
  public displayModal!: boolean;
  public controlName = {
    cateName: 'cateName',
    description: 'description',
  };
  public categloryForm!: FormGroup;
  public createCateglory() {
    const me = this;
    me.displayModal = true;
    me.categloryForm.reset();
    me.createNew = true;
  }
  public getCateglorys(): void {
    const me = this;
    me.cateSV
      .getCateglorys()
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.categlorys = data;
        })
      )
      .subscribe();
  }
  public getCateglory(id: string): void {
    const me = this;
    me.cateSV
      .getCateglory(id)
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.categlory = data;
          console.log(me.categlory);
          me.categloryForm.patchValue({
            [me.controlName.cateName]: data.cateName,
            [me.controlName.description]: data.description,
          });
        })
      )
      .subscribe({
        next: (_req) => {
          console.log(me.categlory);
          me.getCateglorys();
          me.displayModal = true;
          me.createNew = false;
        },
      });
  }
  public confirmCreate() {
    const me = this;
    me.cateSV
      .createCateglory(me.categloryForm.value)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        next: (_req) => {
          me.getCateglorys();
          me.displayModal = false;
        },
      });
  }
  public confirmUpdate() {
    const me = this;
    me.cateSV
      .updateCateglory(me.categlory._id,me.categloryForm.value)
      .pipe(
        takeUntil(me.destroy$),
      )
      .subscribe({
        next: (_req) => {
          me.getCateglorys();
          me.displayModal = false;
        },
      });
  }
  private initForm() {
    const me = this;
    me.categloryForm = me.formBd.group({
      [me.controlName.cateName]: ['', Validators.required],
      [me.controlName.description]: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const me = this;
    me.getCateglorys();
    me.initForm();
  }
  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
