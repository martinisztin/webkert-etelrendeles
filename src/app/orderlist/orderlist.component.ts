import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Order } from '../shared/models/order';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orders! : Order[];
  priciestOrder! : Order[];

  constructor(private os : OrderService) {
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.os.fetchByUid(user.uid).subscribe(data => {
      this.orders = data;

      this.os.fetchPriciestOrder(user.uid).subscribe(data => {
        this.priciestOrder = data;
        console.log(this.priciestOrder);
      });
      //console.log(this.orders);
    });


  }

}
