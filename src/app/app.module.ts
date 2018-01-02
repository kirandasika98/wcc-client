import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ROUTING } from "./app.routing";
import { Globals } from "./globals";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminService } from "app/admin.service";

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        MenuComponent,
        OrderComponent,
        LoginComponent,
        DashboardComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        FormsModule,
        HttpModule,
        ClarityModule,
        ROUTING
    ],
    providers: [ 
        Globals,
        AdminService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
