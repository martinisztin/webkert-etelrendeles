import { Component } from '@angular/core';
import { Food } from '../shared/models/food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food/food.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
export class FoodpageComponent {
  food!: Food;
  image!: any;

  constructor(private activatedRoute: ActivatedRoute, private fs: FoodService, private cs: CartService,
    private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
      this.fs.getFoodById(params['id']).subscribe(food => {
        this.food = food;
        this.fs.loadImage(this.food.image).subscribe(data => {
          this.image = data;
        });
      });
    })
  }

  ngOnInit(): void {

  }
  addToCart() {
    this.cs.addToCart(this.food);
    this.router.navigateByUrl('/cart')
  }
}
