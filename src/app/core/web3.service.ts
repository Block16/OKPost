import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';
import {isNullOrUndefined} from "util";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Log} from "web3/types";
let Web3 = require('web3');
let TruffleContract = require('truffle-contract');
let publishContractJson = require('../../assets/contracts/EnduringPublication.json');

declare let web3: any; // for metamask

@Injectable()
export class Web3Service {

  private infura: string;

  private provider: any;
  private web3: any;

  private startBlock: number = 5227599;
  // private startBlock: number = 0;
  private publishContract;
  private trufflePublishContract: any;

  private logsTimer;
  private shouldFetch: boolean = true;

  private logs: Log[] = [];
  public logSubject: BehaviorSubject<Log[]>;

  constructor(
    private httpClient: HttpClient
  ) {
    this.infura = environment.production ? "https://mainnet.infura.io/mMVAl9ZCBbtZ4sc0fBbO" : "https://kovan.infura.io/mMVAl9ZCBbtZ4sc0fBbO";

    this.logSubject = new BehaviorSubject(this.logs);

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      this.provider = web3.currentProvider;
      console.info("Using injected provider.");
    } else {
      this.provider = new Web3.providers.HttpProvider(this.infura);
      console.info("Attempting to use local provider.");
    }

    this.web3 = new Web3(this.provider);

    this.web3.eth.net.getId().then((id) => {
      this.trufflePublishContract = TruffleContract(publishContractJson);
      this.trufflePublishContract.setProvider(this.provider);
      this.trufflePublishContract.setNetwork(id);
      this.publishContract = new this.web3.eth.Contract(this.trufflePublishContract.abi, this.trufflePublishContract.address);
      // Start listening for updates from the probider
      this.listenForUpdates();
    });
  }

  public getWeb3(): any {
    return this.web3;
  }

  private constructRawRpc(method: string, params: any): any {
    return { "jsonrpc":"2.0", "method": method, "params": params, "id":73 };
  }

  private getLogs(from: number, to: number, address?: string, topics?: string[]) {
    let rpcParams = [
        {
          "fromBlock": this.web3.utils.numberToHex(from),
          "toBlock": this.web3.utils.numberToHex(to),
        }
      ];

    if(!isNullOrUndefined(topics)) {
      rpcParams[0]['topics'] = topics;
    }

    if(!isNullOrUndefined(address)) {
      rpcParams[0]['address'] = address;
    }

    const logRpc = this.constructRawRpc("eth_getLogs", rpcParams);
    return this.httpClient.post(this.infura, logRpc);
  }

  /**
   * Listen for other log updates
   */
  private listenForUpdates(): void {
    let topics = ["0x9c856e875de3fdeee34ec099665314870b346bcc036270769e6cdcb1f2a9ea9c"];
    // Callback heaven!
    this.logsTimer = setInterval(() => {
      if(this.shouldFetch) {
        // Could die holding lock if there's an error here.
        this.shouldFetch = false;
        this.web3.eth.getBlock("latest").then((result) => {
          let from = this.startBlock;
          let to = result.number;
          this.getLogs(from, to, this.trufflePublishContract.address, topics).subscribe((rpcResult) => {
            let newLogs = this.logs.slice();

            rpcResult['result'].forEach((log: Log) => {
              newLogs.push(log);
            });

            this.startBlock = to;
            this.logs = newLogs;

            this.logSubject.next(newLogs);
          }, (error) => {
            console.log(error);
          });
        });
      }
    }, 10000);
  }

}
