import { ChangeDetectorRef, Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
     open(){
    const row=document.getElementById("row") ;
    const menu=document.getElementById("menu") ;
    const home=document.getElementById("home"); 
    if(row && menu){
      if(row.style.width==="15%"){
        
        menu.classList.add('horizTranslate');
        row.style.width="60px";
        menu.style.width="60px";
      }
      else{
        row.style.width="15%";
        menu.style.width="15%";
      }      
    }
   if(menu && home) {
      // if(menu.classList.contains("col-2")){
      //   menu.classList.remove("col-1 horizTranslate");
      //   menu.classList.add("col-2");
        
      // }
      // else{
      //   menu.classList.add("col-1 horizTranslate");
      //   menu.classList.remove("col-2");
      // }
      if(menu.classList.contains("horizTranslate")){
        menu.classList.remove(" horizTranslate");
      }
      else{
         menu.classList.add("horizTranslate");
      }
      // if(home.classList.contains("col-11")){
      //   home.classList.add("col-10");
      //   home.classList.remove("col-11");
      // }
      // else{
      //   home.classList.add("col-11");
      //   home.classList.remove("col-10");
      // }
    }     
  }
  title = 'circular-economy';
}
