import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/admin.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'app/globals';


interface Order {
  id: number;
  itemName: string;
  orderStatus: string;
  payment: Object;
  specialRequest: string;
  userId: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  newOrders: Array<Order> = [];

  constructor(private adminService : AdminService, private router: Router, private http: HttpClient, private globals: Globals) { }

  ngOnInit() {
    this.adminService.load();
    if (!this.adminService.me().activeSession) {
      this.router.navigate(['/login']);
    }

    if (this.router.url === '/dashboard') {
      this.getOrders();
    }
    else if (this.router.url === '/dashboard/all') {
      this.getAllOrders();
    }
  }

  getOrders() {
    if (this.newOrders.length > 0) {
      this.newOrders = [];
    }
    const orderUrl = this.globals.BASE_API_URL + "/order/?num=10";
    this.http.get(orderUrl).subscribe(data => {
      for (let order of (data as Array<Order>)) {
        this.newOrders.push(order);
      }
    });
  }

  getAllOrders() {
    if (this.newOrders.length > 0) {
      this.newOrders = [];
    }

    const allOrdersUrl = this.globals.BASE_API_URL + "/order/old";
    this.http.get(allOrdersUrl).subscribe(data => {
      for (let order of data as Array<Order>) {
        this.newOrders.push(order);
      }
    });
  }

  updateOrder(id: number) {
    let updateOrder : Order;
    for (let order of this.newOrders) {
      if (order.orderStatus === 'RECEIVED' && order.id === id) {
        order.orderStatus = 'PROCESSING';
        updateOrder = order;
        break;
      }

      if (order.orderStatus === 'PROCESSING' && order.id === id) {
        order.orderStatus = 'PROCESSED';
        updateOrder = order;
        break;
      }
    }

    // Send request to server and save the state
    const orderUpdateUrl = this.globals.BASE_API_URL + "/order/" + id;
    this.http.put(orderUpdateUrl, updateOrder).subscribe(data => {
      this.getOrders();
    });
  }

  orderError(order: Order) {
    // Send an error to the server so it can be sent to the user
    console.log(order);
  }

  refreshOrders() {
    if (this.router.url === '/dashboard') {
      this.getOrders();
    }
    else if (this.router.url === '/dashboard/all') {
      this.getAllOrders();
    }
  }
}
