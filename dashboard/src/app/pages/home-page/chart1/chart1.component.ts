import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/shared/service/report.service';

@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss'],
})
export class Chart1Component implements OnInit {
  public chartAmount!: any;
  public chartUser!: any;
  public data!: any;
  public data1!:any;
  public loadData(data: any) {
    this.chartAmount = {
      labels: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      datasets: [
        {
          label: 'Amount',
          data: data.map((item:any) =>{return item.value}),
          backgroundColor: '#42A5F5',
        },
        {
          label: 'User Register',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 0],
    
          backgroundColor: '#198754',

        },
        {
          label: 'Product Input',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 15, 81, 0],
   
          backgroundColor: '#dc3545',
       
        },
        {
          label: 'New Post',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 0],
      
          backgroundColor: '#FFA726',
   
        },
      ],
    };
  }
  public getData() {
    const me = this;
    me.reportSv.reportByYear().subscribe((x) => (me.data = x));
  }
  public getData1() {
    const me = this;
    me.reportSv.reportByMounth().subscribe((x) => (me.data1 = x));
  }
  private formmatData(data:any){
    
  }
  public loadData1(data: any) {
    this.chartAmount = {
      labels: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
      ],
      datasets: [
        {
          label: 'Amount',
          data:data.map((item:any) =>{return item.value}),
          backgroundColor: '#42A5F5',

        },
        {
          label: 'User Register',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 0],
          backgroundColor: '#198754',
        },
        {
          label: 'Product Input',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 15, 81, 0],
          backgroundColor: '#dc3545',
        },
        {
          label: 'New Post',
          data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 0],
  
          backgroundColor: '#FFA726',

        },
      ],
    };
  }
  constructor(private reportSv: ReportService) {}

  ngOnInit(): void {
    const me = this;
    me.getData();
    me.getData1()
    me.chartAmount = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [
        {
          label: 'Amount',
          data: [],
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4,
        },
        {
          label: 'User Register',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: 'Product Input',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
        {
          label: 'New Post',
          data: [],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
      ],
    };
  }
}
