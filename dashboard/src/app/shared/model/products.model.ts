export namespace Store {
  export interface Slider {
    _id: string;
    productId: Product.Product;
    description: string;
    productDetail: Product.Detail;
    isActive: boolean;
  }
}
export namespace Product {
  export interface Img {
    url: String;
    title: String;
  }
  export interface Categlory {
    _id: string;
    cateName: string | 'name';
    description: string;
  }
  export interface Developer {
    _id: string;
    devName: string;
    devAvatar: string;
    devLinkSocialMedia: string[];
    description: string;
  }
  export interface Discount {
    _id: string;
    name: string;
    description: string;
    discountPercent: Number;
  }
  export interface Product {
    _id: string;
    productName: string;
    shortDescription: string;
    price: number;
    sale: Sale;
    imgX: Img;
    imgY: Img;
    detail?: Detail;
    isActive: Boolean;
  }
  export interface Detail {
    _id: string;
    productId: string;
    developer: Developer;
    description: string;
    categlory: Categlory[];
    rating: number;
    systemrequiment: Systemrequiment[];
    reviews: any;
    imgList: Img[] | [];
  }
  export interface Systemrequiment {
    _id: string;
    os: string;
    cpu: string;
    memory: string;
    gpu: string;
    directX: string;
    soundCard: string;
  }
  export interface Sale {
    salePersent: Number;
    startDay: String;
    endDay: String;
  }
}
