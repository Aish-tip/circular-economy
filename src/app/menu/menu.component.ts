import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  user:any;
  cuser:any
  admin:any;
  userlogged : any;
  term:string;
  searchword:any
  activeuser:any
  arole:any
  constructor(private authservice : AuthService,private router :Router,private http:HttpClient) { }
  role:any;
  ngOnInit(): void {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      this.arole=this.activeuser.role;
      console.log(this.activeuser)
           
    })
  }



  LoggedIn(){
    if(localStorage.getItem('currentUser'))
    {
      this.role= sessionStorage.getItem("role");
      // console.log(this.role);
      if(this.role == 'admin')
      {
        this.admin=true;
        var t = document.getElementById("track");
        t.style.visibility = 'hidden';
      }
      else if(this.role == 'user')
      {
        this.user=true;
      }
      return true;
    }
    else{
      return false;
    }    
  }

  LogOut() {
    // this.user = JSON.parse(localStorage.getItem('currentUser')!);
    // console.log(this.user);
    this.authservice.logout();
    // localStorage.removeItem('currentUser');
    // this.router.navigate(['/login']);
  }
}

// open(){
//   const row=document.getElementById("row") ;
//   const menu=document.getElementById("menu") ;
//   const home=document.getElementById("home"); 
//   const header=document.getElementById("header");
//   if(row && menu && header){
//     if(row.style.width==="15%"){      
//       menu.classList.add('horizTranslate');
//       header.classList.add('horizTranslate')
//       row.style.width="60px";
//       menu.style.width="60px";
//       header.style.width="100%";
//     }
//     else{
//       row.style.width="15%";
//       menu.style.width="15%";
//       header.style.width="100%";
//     }      
//   }
//  if(menu && home) {    
//     if(menu.classList.contains("horizTranslate")){
//       menu.classList.remove(" horizTranslate");
//     }
//     else{
//        menu.classList.add("horizTranslate");
//     }  
//   }   
// }


