import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
import { CategloryService } from 'src/app/shared/service/categlory.service';
import { DevelopersService } from 'src/app/shared/service/developers.service';

@Component({
  selector: 'app-home-page-intro',
  templateUrl: './home-page-intro.component.html',
  styleUrls: ['./home-page-intro.component.scss'],
})
export class HomePageIntroComponent implements OnInit {
  items!: MegaMenuItem[];
  public categloryList: any =[];
  public developerList: any =[];
  constructor(
    private categlorySv: CategloryService,
    private develeperSv: DevelopersService
  ) {}
  private getCateglory() {
    const me = this;
    forkJoin({
      categlory: me.categlorySv.getCateglorys(),
      developer: me.develeperSv.getDevelopers(),
    })
      .pipe(
        tap(({categlory,developer}) => {
          categlory.map((item) => {
            return me.categloryList.push({ label: item.cateName });
          });
          developer.map((item) => {
            return me.developerList.push({ label: item.devName });
          });
          
        })
      )
      .subscribe({
        complete: () => {
          this.items = [
            {
              label: 'New & Noteworthy',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'New & Noteworthy',
                    style: { 'font-size': '15px' },
                    items: [
                      { label: 'Top Seller' },
                      { label: 'New & Trending' },
                      { label: 'Recently update' },
                      { label: 'Special offer' },
                    ],
                  },
                ],
              ],
            },
            {
              label: 'Categlory',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(0, 4),
                    
                  },
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(5, 9),
                  },
                ],
                [
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(10, 14),
                  },
                  {
                    label: 'Categlory',
                    style: { 'font-size': '15px' },
                    items: this.categloryList.slice(15, 19),
                  },
                ],
              ],
            },
            {
              label: 'Developer',
              style: { 'font-size': '15px' },
              items: [
                [
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(0, 4),
                  },
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(5, 9),
                  },
                ],
                [
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(10, 14),
                  },
                  {
                    label: 'Developer',
                    style: { 'font-size': '15px' },
                    items: this.developerList.slice(15, 19),
                  },
                ],
              ],
            },
            {
              label: 'News',
              style: { 'font-size': '15px' },
              styleClass: 'me-4',
            },
          ];
        },
      });
    me.categlorySv.getCateglorys().pipe();
  }
  ngOnInit(): void {
    this.getCateglory();
  }
}
