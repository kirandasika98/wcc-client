import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Globals } from "app/globals";

interface Product {
    id : number;
    name?: string;
    description?: string;
    price?: number;
}

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
    private catalogItems : Array<Product>
    constructor(private http: HttpClient, private globals: Globals) {}

    ngOnInit() {
        this.getProductsList();
    }

    getProductsList(){
        let products : Array<Product> = [];
        const productListUrl = this.globals.BASE_API_URL + "/order/product/";
        this.http.get(productListUrl).subscribe(data => {
            for (let product of data as Array<Product>) {
                products.push(product);
            }
            this.catalogItems = products;
        });
    }
}
