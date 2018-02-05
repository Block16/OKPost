import { Component, Input, Output, OnInit } from '@angular/core';
import {DatashareService} from "../../core/datashare.service";

@Component({
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  styleUrls: ['./post-button.component.scss']
})
export class PostButtonComponent implements OnInit {
	
  @Input('postMode') postMode;
  
  constructor(private datashareService: DatashareService) { }
  
  setShowOverlay(bool) {
    this.datashareService.setShowOverlay(bool);
  }
  
  ngOnInit() {
  }

}
