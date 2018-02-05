import {Component, OnInit} from '@angular/core';
import {Web3Service} from "../../core/web3.service";
import { ChangeDetectorRef } from '@angular/core';
import {Log} from "web3/types";
import {Post} from "../../shared/models/post";
import {AbstractControl, FormBuilder, FormGroup, FormsModule, Validators} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DatashareService} from "../../core/datashare.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss', '../single-post-view/post.component.scss'
  ]
})
export class HomeComponent implements OnInit {

  private web3: any;

  public logs: Log[] = [];
  public posts: Post[] = [];
  
  // UI
  private showOverlay = false;
  private showGasSettings = false;
  public postMode = {
    default: true, // textarea contains nothing
    active: false, // textarea contains text (default for now)
    confirm: false, // button clicked once
    working: false, // posting…
  };
  
  // Broadcast form
  public broadCastForm: FormGroup;
  public messageControl: AbstractControl;
  public gasPriceControl: AbstractControl;
  public gasLimitControl: AbstractControl;
  public gasPrice: number = 30;
  public gasLimit: number = 35000;
  public postText;

  public loggedIn: boolean = false;
  public account: string;
  
  private overlaySubscription: Subscription;

  constructor (
    private formBuilder: FormBuilder,
    private web3Service: Web3Service,
    private changeDetectorRef: ChangeDetectorRef,
    private dataShareService: DatashareService
  ) {
    this.web3 = this.web3Service.getWeb3();

    this.broadCastForm = this.formBuilder.group({
      'message':   ['', [ Validators.required, Validators.pattern('^[\\ -z]+$')] ],
      'gasPrice': ['', [ Validators.required, Validators.min(1), Validators.max(80)] ],
      'gasLimit': ['', [ Validators.required, Validators.min(35000)] ],
    });
    
    this.overlaySubscription = this.dataShareService.showOverlay.subscribe((value: boolean) => {
      this.showOverlay = value;
    });
      
    this.messageControl = this.broadCastForm.controls['message'];
    this.gasPriceControl = this.broadCastForm.controls['gasPrice'];
    this.gasLimitControl = this.broadCastForm.controls['gasLimit'];
  }
  
  clickPost() {
      // placeholder for advanced button behavior
      if (this.postMode.active) {
        this.setPostMode('confirm');
      } else if (this.postMode.confirm) {
        this.setPostMode('active');
      }
  }
  
  postTextChange(value) {
    console.log(value);
    if (value.length == 0) {
      this.setPostMode('default');
    } else if (value.length > 0 && !this.postMode.confirm) {
      this.setPostMode('active');
    }
  }
  
  setOpenMenu(bool) {
    this.dataShareService.setShowMenu(bool);
  }
  
  setPostMode(desiredMode: string): void {
    for (const name of Object.keys(this.postMode)) {
      (name !== desiredMode) ? this.postMode[name] = false : this.postMode[name] = true;
    }
  }
  ngOnInit() {
    this.web3Service.loggedIn.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.web3Service.account.subscribe((account) => {
      this.account = account;
    });

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

  private getText(data: string): string {
    return this.web3.utils.hexToAscii(data.substr(2).substr(0, (data.length - 2) / 2));
  }

  private getMsgNumber(data: string): number {
    return this.web3.utils.hexToNumber(data.substr(2).substr((data.length - 2) / 2, data.length - 2));
  }
}
