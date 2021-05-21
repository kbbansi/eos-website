import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { CheckoutCartComponent } from './components/checkout-cart/checkout-cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'register', component: AuthenticationComponent },
  { path: 'login', component: AuthenticationComponent },
  { path: 'profile', component: UserAccountComponent },
  { path: 'view-cart', component: CheckoutCartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
