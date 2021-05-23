import { Injectable } from '@angular/core';
import { Product } from 'src/app/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  constructor() { }

  //add to cart method
  addToCart(product: Product){
    this.items.push(product);
    console.log(this.items);
  }

  // get cart items
  getItems(){
    console.log(this.items);
    return this.items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }
}
