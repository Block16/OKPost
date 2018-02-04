import {Component, OnInit} from '@angular/core';
import {Web3Service} from "../../core/web3.service";
import { ChangeDetectorRef } from '@angular/core';
import {Log} from "web3/types";
import {Post} from "../../shared/models/post";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatashareService} from "../../core/datashare.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss'
  ]
})
export class HomeComponent implements OnInit {

  private web3: any;

  public logs: Log[] = [];
  public posts: Post[] = [];

  // Broadcast form
  public broadCastForm: FormGroup;
  public messageControl: AbstractControl;
  public gasPriceControl: AbstractControl;
  public gasLimitControl: AbstractControl;
  public gasPrice: number = 30;
  public gasLimit: number = 35000;
  public postText;

  constructor(
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private changeDetectorRef: ChangeDetectorRef,
    private datashareService: DatashareService
  ) {
    this.web3 = this.web3Service.getWeb3();

    this.broadCastForm = this.formBuilder.group({
      'message':   ['', [ Validators.required, Validators.pattern('^[\\ -z]+$')] ],
      'gasPrice': ['', [ Validators.required, Validators.min(1), Validators.max(80)] ],
      'gasLimit': ['', [ Validators.required, Validators.min(35000)] ],
    });

    this.messageControl = this.broadCastForm.controls['message'];
    this.gasPriceControl = this.broadCastForm.controls['gasPrice'];
    this.gasLimitControl = this.broadCastForm.controls['gasLimit'];
  }
  
  setOpenMenu(bool) {
    this.datashareService.setShowMenu(bool);
  }

  ngOnInit() {
    // Listen to the blockchain
    this.web3Service.logSubject.subscribe((logs: Log[]) => {
      this.logs = logs;
      this.posts = [];

      for (let l of logs) {
        this.getMsgNumber(l.data);
        this.getText(l.data);
      }

      this.changeDetectorRef.detectChanges();
    });
  }

  public toggleSidebar() {
    this.datashareService.toggleSidebar();
  }

  private getText(data: string): string {
    return this.web3.utils.hexToAscii(data.substr(2).substr(0, (data.length - 2) / 2));
  }

  private getMsgNumber(data: string): number {
    return this.web3.utils.hexToNumber(data.substr(2).substr((data.length - 2) / 2, data.length - 2));
  }
}
