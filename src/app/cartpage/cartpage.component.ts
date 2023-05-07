import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { Cart } from '../shared/models/cart';
import { CartItem } from '../shared/models/cartitem';
import { FoodService } from '../services/food/food.service';
import { OrderService } from '../services/order/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent implements OnInit {
  cart!: Cart;
  constructor(private cartService: CartService, private fs : FoodService, private os : OrderService,
    private router : Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;

      this.cart.items.forEach(element => {
        this.fs.loadImage(element.food.image).subscribe(kek => {
          element.food.image = kek;
        });
      });

    })
  }
  ngOnInit() : void {

  }
  removeFromCart(cartItem : CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  onCheckout() {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    let res: string[] = [];
    this.cart.items.forEach(element => {
      res.push(element.food.name);
    });
    this.os.create({
      id : '',
      ordered : res,
      orderer : user ? user.uid : '',
      price : this.cart.totalPrice
    }).then(() => {
      this.cartService.clearCart();
      this.router.navigateByUrl('/');
    }).catch(error => {
      console.log(error);
    });
  }
}
