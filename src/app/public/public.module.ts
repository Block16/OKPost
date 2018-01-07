import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {PublicRoutingModule} from "./public.routing";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  imports: [
    PublicRoutingModule,
    CommonModule,
    RouterModule,

    SharedModule,
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    LayoutComponent
  ]
})
export class PublicModule { }
