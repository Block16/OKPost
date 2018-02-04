import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class UiService {
	public menuState$: EventEmitter<any>;
	
  constructor() {
  	this.menuState$ = new EventEmitter();
  }
  
  public setShowMenu(bool) {
  	console.log('setOpenMenu in ui.service: ' + bool);
		this.menuState$.emit(bool);
  }

}
