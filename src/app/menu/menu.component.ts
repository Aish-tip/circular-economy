import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 user:any;
 
  constructor(private authservice : AuthService,private router :Router) { }

  ngOnInit(): void {
    
  }
  open(){
    const row=document.getElementById("row") ;
    const menu=document.getElementById("menu") ;
    const home=document.getElementById("home"); 
    const header=document.getElementById("header");
    if(row && menu && header){
      if(row.style.width==="15%"){
        
        menu.classList.add('horizTranslate');
        header.classList.add('horizTranslate')
        row.style.width="60px";
        menu.style.width="60px";
        header.style.width="100%";
      }
      else{
        row.style.width="15%";
        menu.style.width="15%";
        header.style.width="100%";
      }      
    }
   if(menu && home) {
      
      if(menu.classList.contains("horizTranslate")){
        menu.classList.remove(" horizTranslate");
      }
      else{
         menu.classList.add("horizTranslate");
      }
      
    
    } 
    
   
    
}
LogOut() {
  this.user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.user);
  this.authservice.logout(this.user);
  localStorage.removeItem('currentUser');

  // window.location.reload();
  this.router.navigate(['/login']);

}
}


