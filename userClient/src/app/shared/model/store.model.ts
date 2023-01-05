import { Product } from "./products.model";


export namespace Order{
    export interface Order{
        _id:string;
        user:any;
        totalPrice:Number;
        disCountCode:string;
        paymentMethod:string;
        address:string;
        isPaid:boolean;
        paidAt:Date;
    }
}
