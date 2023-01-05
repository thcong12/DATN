import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-base',
  template:''
})
export abstract class BaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();
  constructor() {

  }
  public show(){

  }
  abstract onDestroy(): void;

  ngOnDestroy(): void {
    const me = this;
    me.onDestroy();
  }
}
