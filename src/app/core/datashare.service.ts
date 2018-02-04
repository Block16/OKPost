import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DatashareService {

  public sidebarOpen: BehaviorSubject<boolean>;
  public topbarOpen: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarOpen = new BehaviorSubject(false);
    this.topbarOpen = new BehaviorSubject(false);
  }

  public toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.getValue());
  }

  public toggleTopbar() {
    this.topbarOpen.next(!this.topbarOpen.getValue());
  }
}
