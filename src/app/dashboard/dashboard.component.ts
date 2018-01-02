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

    // Get new orders
    this.getOrders();
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

}
