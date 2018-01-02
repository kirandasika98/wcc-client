import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Admin {
  uid : number;
  username?: string;
  perms?: Array<string>;
  activeSession?: boolean;
  superUser?: boolean;
}

@Injectable()
export class AdminService {
  private currentAdmin : Admin;
  constructor(private router: Router) { }

  save() : boolean {
    localStorage.setItem("userData", JSON.stringify(this.currentAdmin));
    return true;
  }

  load() : boolean {
    const data = JSON.parse(localStorage.getItem("userData"));
    this.currentAdmin = {uid:0};
    if (data === null) {

      return true;
    }
    this.currentAdmin.uid = data.uid;
    this.currentAdmin.username = data.username;
    this.currentAdmin.perms = data.perms;
    this.currentAdmin.activeSession = true;
    this.currentAdmin.superUser = data.superUser;
    return true;
  }

  logout() {
    localStorage.removeItem("userData");
    this.router.navigate(["/login"]);
  }

  me(): Admin {
    return this.currentAdmin;
  }

  loginAdmin(uid : number, username : string, perms : Array<string>, superUser: boolean) : Admin {
    let newAdmin : Admin = {uid:uid};
    newAdmin.uid = uid;
    newAdmin.username = username;
    newAdmin.perms = perms;
    newAdmin.activeSession = true;
    newAdmin.superUser = superUser;
    // Set currentAdmin as newAdmin to save session
    this.currentAdmin = newAdmin;
    // Save instance to local storage
    this.save();
    return newAdmin;
  }
}
