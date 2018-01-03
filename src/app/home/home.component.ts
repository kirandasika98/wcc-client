/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
    constructor(private http: HttpClient) {}

    ngOnInit() {
    }
}
