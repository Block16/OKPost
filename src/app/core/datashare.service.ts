import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DatashareService {
	
  public sidebarOpen: BehaviorSubject<boolean>;
  public showOverlay: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarOpen = new BehaviorSubject(false);
    this.showOverlay = new BehaviorSubject(false);
  }
  
  public setShowOverlay(bool) {
    this.showOverlay.next(bool);
  }

  public setShowMenu(bool) {
    this.sidebarOpen.next(bool);
  }
}
