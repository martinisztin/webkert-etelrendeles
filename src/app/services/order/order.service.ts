import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collectionName : string = "Orders";

  create(o : Order) {
    o.id = this.afs.createId();
    return this.afs.collection<Order>(this.collectionName).doc(o.id).set(o);
  }

  getAll() {
    return this.afs.collection<Order>(this.collectionName).valueChanges();
  }

  fetchByUid(uid : string) {
    return this.afs.collection<Order>(this.collectionName, ref => ref.where('orderer', '==', uid)).valueChanges();
  }

  fetchPriciestOrder(uid : string) {
    return this.afs.collection<Order>(this.collectionName, ref => ref.where('orderer', '==', uid).orderBy('price', 'desc').limit(1)).valueChanges();
  }

  constructor(private afs: AngularFirestore) { }
}
