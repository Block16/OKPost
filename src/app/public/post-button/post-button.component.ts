import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  styleUrls: ['./post-button.component.scss']
})
export class PostButtonComponent implements OnInit {
	
	public mode = {
	  default: false, // textarea contains nothing
	  active: true, // textarea contains text
	  confirm: false, // button clicked once
	  working: false, // posting…
	};
  constructor() { }
  
  clickPost() {
    
    // placeholder for advanced button behavior
  	if (this.mode.active) {
  		// this.setMode('confirm');
  	} else if (this.mode.confirm) {
      // this.setMode('active');
    }
  }
  
  setMode(desiredMode: string): void {
    for (const name of Object.keys(this.mode)) {
      (name !== desiredMode) ? this.mode[name] = false : this.mode[name] = true;
    }
  }
  
  ngOnInit() {
  }

}
