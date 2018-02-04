import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DatashareService {

  public sidebarOpen: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarOpen = new BehaviorSubject(false);
  }

  public toggleSidebar() {
    this.sidebarOpen.next(!this.sidebarOpen.getValue());
  }

  public openSidebar() {
    if(!this.sidebarOpen.getValue()) {
      this.sidebarOpen.next(true);
    }
  }

  public closeSidebar() {
    if(this.sidebarOpen.getValue()) {
      this.sidebarOpen.next(false);
    }
  }
}
