import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  productImage: any = {};
  total: number;
  order: any = {};
  dataBucket: any = {};
  constructor(private router: Router, private cart: CartService, private api: ApiService) { }

  item = this.cart.getItems();

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/shop'])
  }

  getDetails(data: any) {
    console.log(data);
    this.productImage = data.productImage;
    if (data) {
      this.total = data.total;
      console.log(this.total);
      console.log(this.productImage);
    } else {
      this.total = 0;
    }
  }

  clearCart() {
    this.cart.clearCart();
    alert('Clearing cart....');
  }

  checkingOut() {
    if (sessionStorage.getItem('id')) {
      console.log(sessionStorage.getItem('id'));
      console.log('Yeaaa.....');
      alert('Checking out.....');
      // start modal to select payment method 
      // open modal
      // select pay now or pay on delivery
      // on pay now open paystack
      // on pay on delivery process order
      
      
      // use a loop!!!
      for (let i = 0; i <= this.item.length; ++i) {
        console.log(this.item[i].id);
        this.order = {
          userID: sessionStorage.getItem('id'),
          productID: this.item[i].id,
          quantity: this.item[i].quantity
        }
        console.log(this.order);
        this.api.placeOrder(this.order).subscribe(response => {
          this.dataBucket = response;
          if (this.dataBucket.status === 201) {
            alert('Order Placed Successfully');
          }
        })
      }
      this.cart.clearCart();
    } else {
      alert('You need to Login to checkout');
    }
  }

  payStack(){
    alert('Calling PayStack Now')
  }
}
