import { Injectable } from '@angular/core';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tag';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getFoodById(id:number) : Food {
    return this.getAll().find(food => food.id == id)!;
  }

  getAllFoodByTag(tag : string) : Food[] {
    return tag == "minden" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag))
  }

  getAllTag(): Tag[] {
    return [
      { name: 'minden', count: 7},
      { name: 'sonkás', count: 3},
      { name: 'különleges', count: 2},
      { name: 'kukoricás', count: 2}
    ]
  }

  getAll(): Food[]{
    return [
      {
        id: 1,
        name: 'Margaréta',
        price: 2000,
        cookTime: '20-30',
        favorite: false,
        imageUrl: '/assets/margareta_nagy.jpg',
        tags: ['pizza', 'margaréta', 'különleges'],
      },
      {
        id: 2,
        name: 'Aladdin',
        price: 1900,
        cookTime: '20-30',
        favorite: true,
        imageUrl: '/assets/aladdin_nagy.jpg',
        tags: ['pizza', 'aladdin', 'különleges'],
      },
      {
        id: 3,
        name: 'Gombás',
        price: 2100,
        cookTime: '20-30',
        favorite: true,
        imageUrl: '/assets/gombas_nagy.jpg',
        tags: ['pizza', 'gombás'],
      },
      {
        id: 4,
        name: 'Kukoricás',
        price: 2000,
        cookTime: '20-30',
        favorite: false,
        imageUrl: '/assets/kukoricas_big.jpg',
        tags: ['pizza', 'kukoricás'],
      },
      {
        id: 5,
        name: 'Sonkás-gombás',
        price: 2400,
        cookTime: '20-30',
        favorite: false,
        imageUrl: '/assets/sg_nagy.jpg',
        tags: ['pizza', 'sonkás', 'gombás'],
      },
      {
        id: 6,
        name: 'Sonkás-gombás-kukoricás',
        price: 2600,
        cookTime: '20-30',
        favorite: false,
        imageUrl: '/assets/sgk.jpg',
        tags: ['pizza', 'sonkás', 'gombás', 'kukoricás'],
      },
      {
        id: 7,
        name: 'Sonkás',
        price: 2200,
        cookTime: '20-30',
        favorite: false,
        imageUrl: '/assets/finom_nagy.jpg',
        tags: ['pizza', 'sonkás'],
      },
      {
        id: 8,
        name: 'Húsimádó',
        price: 5000,
        cookTime: '30-40',
        favorite: true,
        imageUrl: '/assets/husimado_nagy.jpg',
        tags: ['pizza', 'húsimádó'],
      }
    ]
  }
}
