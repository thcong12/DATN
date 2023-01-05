import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shared/component/base.component';
import { Product } from 'src/app/shared/model/products.model';
import { DevelopersService } from 'src/app/shared/service/developers.service';

@Component({
  selector: 'app-table-developer-page',
  templateUrl: './table-developer-page.component.html',
  styleUrls: ['./table-developer-page.component.scss'],
})
export class TableDeveloperPageComponent
  extends BaseComponent
  implements OnInit
{
  constructor(private devSv: DevelopersService, private formBd: FormBuilder) {
    super();
  }
  public createNew!: boolean;
  public developerForm!: FormGroup;
  public developers!: Product.Developer[];
  public developer!: Product.Developer;
  public displayModal!: boolean;
  public option!: string[];
  public select!: string;
  private getDevelopers(): void {
    const me = this;
    me.devSv
      .getDevelopers()
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.developers = data;
        })
      )
      .subscribe();
  }
  public controlName = {
    name: 'devName',
    devAvatar: 'devAvatar',
    description: 'description',
    devLinkSocialMedia: 'devLinkSocialMedia',
  };
  public addLinksocial(url: string) {
    const me = this;
    return me.devLinkSocial.push(me.formBd.control(url));
  }
  public deleteLinksocial(index: number) {
    const me = this;
    me.devLinkSocial.removeAt(index);
  }
  public createDeveloper() {
    const me = this;
    me.displayModal = true;
    me.developerForm.reset();
    me.createNew = true;
  }
  public getDeveloper(id: string): void {
    const me = this;
    me.devSv
      .getDeveloper(id)
      .pipe(
        takeUntil(me.destroy$),
        tap((data) => {
          me.developer = data;
          me.developerForm.patchValue({
            ...data,
            [me.controlName.name]: data.devName,
            [me.controlName.devAvatar]: data.devAvatar,
            [me.controlName.description]: data.description,
          });
          data.devLinkSocialMedia.map((item) => {
            me.devLinkSocial.push(me.formBd.control(item));
          });
          setTimeout(() => {
            console.log(me.developerForm.value);
          }, 2000);
        })
      )
      .subscribe({
        next: (_req) => {
          me.getDevelopers();
          me.displayModal = true;
          me.createNew = false;
        },
      });
  }
  public confirmCreate() {
    const me = this;
    me.devSv
      .createDeveloper(me.developerForm.value)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        next: (_req) => {
          me.getDevelopers();
          me.displayModal = false;
        },
      });
  }
  public confirmUpdate() {
    const me = this;
    me.devSv
      .updateDeveloper(me.developer._id, me.developerForm.value)
      .pipe(takeUntil(me.destroy$))
      .subscribe({
        next: (_req) => {
          me.getDevelopers();
          me.displayModal = false;
        },
      });
  }
  private initForm() {
    const me = this;
    me.developerForm = me.formBd.group({
      [me.controlName.name]: ['', Validators.required],
      [me.controlName.devAvatar]: ['', Validators.required],
      [me.controlName.devLinkSocialMedia]: me.formBd.array([]),
      [me.controlName.description]: ['', Validators.required],
    });
  }
  get devLinkSocial(): FormArray {
    const me = this;
    return me.developerForm.get(me.controlName.devLinkSocialMedia) as FormArray;
  }
  get avatardev() {
    return this.developerForm.get(this.controlName.devAvatar)?.value;
  }
  ngOnInit(): void {
    const me = this;
    me.getDevelopers();
    me.initForm();
  }

  onDestroy(): void {
    const me = this;
    me.destroy$.next();
    me.destroy$.complete();
    me.destroy$.unsubscribe();
  }
}
