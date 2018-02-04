import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatashareService} from "../../core/datashare.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public showMenu: boolean;
  private menuSubscription: Subscription;

  constructor(
    private dataShareService: DatashareService,
  ) {
    this.menuSubscription = this.dataShareService.sidebarOpen.subscribe((value: boolean) => {
      this.showMenu = value;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }
}
