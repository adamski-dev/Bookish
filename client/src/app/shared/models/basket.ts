import * as cuid from "cuid";

export interface IBasketItem {
    id: number;
    productName: string;
    author: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    category: string;
    type: string;
}

export interface Basket {
    id: string;
    items: IBasketItem[];
}

export class Basket implements Basket {   
    id = cuid();
    items: IBasketItem[] = [];
}

export interface IBasketTotal {
    shipping: number;
    subtotal: number;
    total: number;
}