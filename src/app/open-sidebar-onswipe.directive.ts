import { Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { fromEvent, tap } from 'rxjs';

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
      //this.startOnTouch();
   }
   /*startOnTouch(){
      fromEvent(document, 'touchstart').pipe(
      tap((e: TouchEvent) => e.touches[0].clientX <=20 && e.touches[0].clientY >= 65 ? (this.sidebar.open(),
         this.setWidth.emit (e.touches[0].clientX)) : '' )
       ).subscribe();
      }*/

  constructor() { }

}
