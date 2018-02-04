import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DatashareService {

  public sidebarOpen: BehaviorSubject<boolean>;

  constructor() {
    this.sidebarOpen = new BehaviorSubject(false);
  }

  public setShowMenu(bool) {
    this.sidebarOpen.next(bool);
  }
}
