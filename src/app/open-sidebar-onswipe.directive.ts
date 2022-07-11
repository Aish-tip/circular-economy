import { Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Directive({
  selector: '[appOpenSidebarOnswipe]'
})

export class OpenSidebarOnswipeDirective {
  @HostBinding('style.width') width: any;
  sidebar!: MatSidenav;
   @Input('sideNav') set sideNav(sideNav: MatSidenav){
      this.sidebar = sideNav;
   }
   @Output() setWidth: EventEmitter<number> = new EventEmitter<number>();
   ngAfterViewInit(){
      this.setWidth.emit(80);
   }   
  constructor() { }
}
