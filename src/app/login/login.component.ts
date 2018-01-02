import { Component, OnInit } from '@angular/core';
import { Globals } from 'app/globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginUsername : string;
  public loginPassword : string;
  public errMessage : object;
  public loginSuccess : boolean;

  constructor(private globals : Globals, private http : HttpClient, private router : Router, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.load();
    this.loginUsername = "saikiran";
    this.loginPassword = "123";
  }

  login() {
    const loginPayload = {'username': this.loginUsername,'password': this.loginPassword}
    let loginUrl = this.globals.BASE_API_URL + "/admin/login";
    this.http.post(loginUrl, loginPayload).subscribe(
      data => {
        this.loginSuccess = true;
        this.adminService.loginAdmin(data['id'] as number, data['username'], data['perms'], data['superUser']);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errMessage = err.error;
      }
    );
  }
}
