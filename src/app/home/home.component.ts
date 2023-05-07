import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Food } from '../shared/models/food';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  foods : Food[] = []
  image : any;

  constructor(private fs : FoodService, private router : ActivatedRoute) {
  }

  ngOnInit(): void {

    this.router.params.subscribe(params => {
      if(params['searchItem']) {
        this.fs.getAll()
        .pipe(
          map(foods => foods.filter(food => food.name.toLowerCase().includes(params['searchItem'].toLowerCase())))
        )
        .subscribe(foods => {
          this.foods = foods;
          this.foods.forEach(element => {
            this.fs.loadImage(element.image).subscribe(kek => {
              element.image = kek;
            });
          });
        });
      }
      
      else if(params['tag']) {
        this.fs.getAllFoodByTag(params['tag']).subscribe(foods => {
          this.foods = foods;
          this.foods.forEach(element => {
            this.fs.loadImage(element.image).subscribe(kek => {
              element.image = kek;
            });
          });
        });
      }
      else {
        this.fs.getAll().subscribe(foods => {
          this.foods = foods;
          this.foods.forEach(element => {
            this.fs.loadImage(element.image).subscribe(kek => {
              element.image = kek;
            });
          });
        });
      }
    })

    
  }

  ngOnDestroy(): void {
      
  }

}
