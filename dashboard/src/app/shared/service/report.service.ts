import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService{
  public getAmount(){
    const me =this;
    const url = `report/`
    return me.get(url)
  }
  constructor(http:HttpClient) {super(http) }
  public reportByYear(){
    const me =this;
    const url = `report/amount/year`
    return me.get(url)
  }
  public reportByMounth(){
    const me =this;
    const url = `report/amount/mounth`
    return me.get(url)
  }
  public reportBestSeller(){
    const me =this;
    const url = `report/bestseller`
    return me.get(url)
  }
}
