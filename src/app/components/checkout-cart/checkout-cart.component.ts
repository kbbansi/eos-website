import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-checkout-cart',
  templateUrl: './checkout-cart.component.html',
  styleUrls: ['./checkout-cart.component.css']
})
export class CheckoutCartComponent implements OnInit {
  
  constructor(private router: Router, private cart: CartService) { }

  item = this.cart.getItems();
  
  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['/shop'])
  }

}
