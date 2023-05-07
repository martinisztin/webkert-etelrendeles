import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodpageComponent } from './foodpage/foodpage.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { OrderlistComponent } from './orderlist/orderlist.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    //canActivate: [AuthGuard]
  },
  {
    path:'search/:searchItem',
     component:HomeComponent
  },
  {
    path:'tag/:tag',
    component:HomeComponent
  },
  {
    path:'food/:id',
    component:FoodpageComponent
  },
  {
    path:'cart',
    component:CartpageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'orders',
    component:OrderlistComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
