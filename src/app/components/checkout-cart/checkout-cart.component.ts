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
  amount: number;
  order: any = {};
  dataBucket: any = {};
  title: any;
  jenPay: any = {};
  totalAmount: number[] = [];

  constructor(private router: Router, private cart: CartService, private api: ApiService) { }

  item = this.cart.getItems();

  ngOnInit(): void {
  }

  goBack() {
    this.router.navigate(['/shop'])
  }

  /** PayStack Methods*/
  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
  }

  paymentCancel() {
    console.log('payment failed');
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

  payStack() {
    let totalAmount = [];
    let sum;
    if (sessionStorage.getItem('id')) {
      console.log(sessionStorage.getItem('id'));
      console.log('Yeaaa.....');
      alert('Checking out.....');

      // use a loop!!!
      for (let i = 0; i <= this.item.length; ++i) {
        console.log(this.item[i].id);
        this.order = {
          userID: sessionStorage.getItem('id'),
          productID: this.item[i].id,
          quantity: this.item[i].quantity
        }
        
        console.log(typeof(this.item[i].total));

        this.amount = this.item[i].total;
        console.log(this.amount);
        totalAmount.push(this.amount);       
        console.log(this.order);

        this.jenPay = {
          amount: this.amount,
          email: sessionStorage.getItem('email'),
          firstName: sessionStorage.getItem('firstName'),
          productID: this.item[i].id
        }
        this.api.makePayment(this.jenPay).subscribe(response => {
          console.log('fingers crossed');
          console.log(response)
          this.dataBucket = response;
          window.open(this.dataBucket.message);
        })
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
}
