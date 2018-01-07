import {Component, OnInit} from '@angular/core';
import {Web3Service} from "../../core/web3.service";
import { ChangeDetectorRef } from '@angular/core';
import {Log} from "web3/types";
import {Post} from "../../shared/models/post";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  public logs: Log[] = [];
  public posts: Post[] = [];
  private web3: any;


  constructor(
    private web3Service: Web3Service,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.web3 = this.web3Service.getWeb3();
  }

  ngOnInit() {
    this.web3Service.logSubject.subscribe((logs: Log[]) => {
      this.logs = logs;
      this.posts = [];

      for(let l of logs) {
        this.getMsgNumber(l.data);
        this.getText(l.data);
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  private getText(data: string): string {
    return this.web3.utils.hexToAscii(data.substr(2).substr(0, (data.length - 2) / 2));
  }

  private getMsgNumber(data: string): number {
    return this.web3.utils.hexToNumber(data.substr(2).substr((data.length - 2) / 2, data.length - 2));
  }
}
