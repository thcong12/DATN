import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss']
})
export class NewsPageComponent implements OnInit,AfterContentInit {
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterContentInit(): void {
    
  }
}
