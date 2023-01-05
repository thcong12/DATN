import { Product } from './products.model';

export namespace Account {
  export interface Admin {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    typeAdmin: TypeAdmin;
    isActive: boolean;
  }
}
export interface TypeAdmin {
  adminType: string;
  isActive: boolean;
}
export namespace User {
  export interface Cart {
    _id: string;
    cartDetail: CartDetail[];
  }
  export interface CartDetail{
    product: Product.Product ;
    quantity: number | 1 ;
  }
  export interface Comment{
    name:string;
    rating:number;
    comment:string;
    user:Detail;
  }
  export interface Detail{
    userId:string;
    fullName:string;
    avatar:string;
    decription:string;
    address:any;
    createdAt:string;
  }
  
}
