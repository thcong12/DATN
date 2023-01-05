import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/model/products.model';

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.scss'],
})
export class DetailFormComponent implements OnInit {
  public defaultimg = {
    img1: 'assets/image/default_Img_x.jpg',
    img2: 'assets/image/default_Img_y.jpg',
  };
  public text1!:any
  public controlDetail = {
    developer: 'developer',
    categlory: 'categlory',
    description: 'description',
    systemrequiment: 'systemrequiment',
    rating: 'rating',
    imgList: 'imgList',
    url: 'url',
    title: 'title',
    os: 'os',
    cpu: 'cpu',
    memory: 'memory',
    gpu: 'gpu',
    directX: 'directX',
    soundCard: 'soundCard',
  };
  public displayModalCategolry!: boolean;
  public displayModdalDescription!: boolean;
  public displayModalSystemRequiment!: boolean;
  public productDetailForm!: FormGroup;
  @Input() categlorys!: Product.Categlory[];
  @Input() developers!: Product.Developer[];
  constructor(
    private formBuilder: FormBuilder,

  ) {}
  @Input() set productDetail(data: Product.Product) {
    const me = this;
    me.initFormDetail();
    setTimeout(() => {
      me.productDetailForm.patchValue({
        ...data,
        [me.controlDetail.developer]: data?.detail?.developer._id,
        [me.controlDetail.description] : data?.detail?.description
      });
      
      data?.detail?.categlory.map((item) => {
        return me.categloryList.push(me.formBuilder.control(item));
      });
      data?.detail?.imgList.map((img) => {
        return me.imgList.push(me.createImg(img.url, img.title));
      });
      data?.detail?.systemrequiment.map((item) => {
        return me.systemrequimentList.push(me.createSystemRequiment(item.os,item.cpu,item.memory,item.gpu,item.directX,item.soundCard));
      });
    }, 1000);


  }
  @Output() productDetailChange = new EventEmitter<Product.Detail>();
  private initFormDetail() {
    const me = this;
    me.productDetailForm = me.formBuilder.group({
      [me.controlDetail.developer]: ['', Validators.required],
      [me.controlDetail.categlory]: me.formBuilder.array([]),
      [me.controlDetail.description]: ['', Validators.required],
      [me.controlDetail.systemrequiment]: me.formBuilder.array([]),
      [me.controlDetail.imgList]: me.formBuilder.array([]), 
    });
  }

  public addCateglory(item: Product.Categlory) {
    const me = this;
    const a = me.categloryList.controls.map((cate) => {
      return cate.value._id;
    });
    if (a.includes(item._id)) {
      alert("asd")
    } else {
      me.categloryList.push(me.formBuilder.control(item));
      console.log(me.productDetailForm.value);
    }
  }
  public createCateglory(item: Product.Categlory) {
    const me = this;
    return me.formBuilder.group({
      cateId: [item._id, Validators.required],
      cateName: [item.cateName],
      description: [item.description],
    });
  }
  public removeCateglory(item: any) {
    const me = this;
    me.categloryList.removeAt(item);
  }
  //handle Img
  public addImage(url: string, title: string) {
    const me = this;
    me.imgList.push(me.createImg(url, title));
  }

  public deleteImg(index: number) {
    const me = this;
    me.imgList.removeAt(index);
    console.log(me.imgList.value);
  }
  private createImg(url: any, title: any) {
    const me = this;
    return me.formBuilder.group({
      [me.controlDetail.url]: [url, Validators.required],
      [me.controlDetail.title]: [title],
    });
  }
  public addSystemrequiment(os:any,cpu:any,memory:any,gpu:any,directX:any,soundCard:any){
    const me = this;
    me.systemrequimentList.push(me.createSystemRequiment(os, cpu,memory,gpu,directX,soundCard));
    me.displayModalSystemRequiment = false;
    console.log(me.productDetailForm.value)
  }
  public createSystemRequiment(os:any,cpu:any,memory:any,gpu:any,directX:any,soundCard:any) {
    const me = this;
   return me.formBuilder.group({
      [me.controlDetail.os]: [os, Validators.required],
      [me.controlDetail.cpu]: [cpu, Validators.required],
      [me.controlDetail.memory]: [memory, Validators.required],
      [me.controlDetail.gpu]: [gpu, Validators.required],
      [me.controlDetail.directX]: [directX, Validators.required],
      [me.controlDetail.soundCard]: [soundCard, Validators.required],
    });

    
  }

  public changeProductDetail() {
    const me = this;
    me.productDetailChange.emit(me.productDetailForm.value);
    console.log(me.productDetailForm.value)
  }
  get imgList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.imgList) as FormArray;
  }
  get categloryList(): FormArray {
    const me = this;
    return me.productDetailForm.get(me.controlDetail.categlory) as FormArray;
  }
  public showModalDialog(){
    this.displayModalSystemRequiment = true;
  }
  get systemrequimentList(): FormArray {
    const me = this;
    return me.productDetailForm.get(
      me.controlDetail.systemrequiment
    ) as FormArray;
  }
  ngOnInit(): void {
    const me = this;
    me.initFormDetail();
    setTimeout(() => {
      console.log(me.productDetailForm.value)
    }, 2000);
    console.log("asd")
  }
}
