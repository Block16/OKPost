<<<<<<< 74a705b6b8543af54e18f2a7f5942513912cd988
import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatashareService} from "../../core/datashare.service";
import {Subscription} from "rxjs/Subscription";
=======
import { Component, OnInit } from '@angular/core';
import { UiService } from '../../core/ui.service';
>>>>>>> ui service

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
<<<<<<< 74a705b6b8543af54e18f2a7f5942513912cd988
export class NavbarComponent implements OnInit, OnDestroy {

  public showMenu: boolean;
  private menuSubscription: Subscription;

  constructor(
    private dataShareService: DatashareService,
  ) {
    this.menuSubscription = this.dataShareService.sidebarOpen.subscribe((value: boolean) => {
      this.showMenu = value;
    });
=======
export class NavbarComponent implements OnInit {
  
  showMenu: false;
  
  constructor(uiService: UiService) {
    uiService.menuState$.subscribe(x => this.setMenuState(x));
  }
  
  private setMenuState(bool) {
    console.log('setMenuState in navbar.component: ' + bool);
      this.showMenu = bool;
>>>>>>> ui service
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }
}
