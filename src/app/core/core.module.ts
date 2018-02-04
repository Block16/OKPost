import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Web3Service} from "./web3.service";
import {HttpClientModule} from "@angular/common/http";
import {UiService} from "./ui.service";


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    Web3Service,
    UiService
  ],
  declarations: []
})
export class CoreModule { }
