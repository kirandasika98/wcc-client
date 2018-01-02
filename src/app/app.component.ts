import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{
    constructor(private router: Router, private adminService: AdminService){
        this.adminService.load();
        console.log(this.adminService);
    }
}
