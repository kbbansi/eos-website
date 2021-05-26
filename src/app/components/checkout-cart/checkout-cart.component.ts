import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  productImage: any = {};
  total: number;
  constructor(private router: Router, private cart: CartService) { }

  item = this.cart.getItems();
  
  ngOnInit(): void {
  }

  goBack(){
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

  checkingOut(){
    console.log('Yeaaa.....');
    alert('Checking out.....')
  }

  clearCart() {
    this.cart.clearCart();
    alert('Clearing cart....');
    location.reload();
  }

}
