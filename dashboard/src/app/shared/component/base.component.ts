import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();
  constructor() {

  }

  abstract onDestroy(): void;

  ngOnDestroy(): void {
    const me = this;
    me.onDestroy();
  }
}
