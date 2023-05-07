import { Injectable } from '@angular/core';
import { Observable, filter, map, switchMap, take } from 'rxjs';
import { Food } from '../../shared/models/food';
import { Tag } from '../../shared/models/tag';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  collectionName = 'Pizzak';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  getFoodById(id: string): Observable<Food> {
    return this.getAll().pipe(
      map(foods => foods.find(food => food.id == id)),
      filter(food => !!food),
      map(food => food!)
    );
  }

  getAllFoodByTag(tag: string): Observable<Food[]> {
    if (tag === "minden") {
      return this.getAll();
    } else {
      return this.getAll().pipe(
        map(foods => foods.filter(food => food.tags?.includes(tag)))
      );
    }
  }

  getAllTag(): Observable<Array<Tag>> {
    return this.afs.collection<Tag>('Tags').valueChanges();
  }

  getAll(): Observable<Array<Food>> {
    return this.afs.collection<Food>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
