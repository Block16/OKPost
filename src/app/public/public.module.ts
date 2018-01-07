import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {SharedModule} from "../shared/shared.module";
import {PublicRoutingModule} from "./public.routing";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from "./navbar/navbar.component";
import { LayoutComponent } from './layout/layout.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from './about/about.component';
import { UserViewComponent } from './user-view/user-view.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    PublicRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,

    SharedModule,
  ],
  declarations: [
    HomeComponent,
    NavbarComponent,
    LayoutComponent,
    AboutComponent,
    UserViewComponent,
    NotFoundComponent
  ]
})
export class PublicModule { }
