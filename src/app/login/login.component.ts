import { Component,  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
import { Urls } from '../constants/urls';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private authservice:AuthService,private http : HttpClient, private router :Router,private tokenStorage: TokenStorageService) {}

    UserLoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
    });

    AdminLoginForm = new FormGroup({
      admin_email: new FormControl(''),
      admin_password: new FormControl('')
    });

    profileForm = new FormGroup({
      firstname: new FormControl(''),
      lastname:new FormControl(''),
      role:new FormControl(''),
      mobile:new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''), 
      password: new FormControl('')        
    });

    role:any;
    userdetails:any
    user:any
    activeuser:any
    userrole:any

    ngOnInit(){
      
    }

    onSubmitUser() { 
      var useremailid = this.UserLoginForm.value.email;
      var userpassword = this.UserLoginForm.value.password;
      this.authservice.login(useremailid, userpassword).subscribe({
        next :Response => {
          this.userdetails = Response;
          console.log("user",this.userdetails)
          this.http.get(`${Urls.USERS}/${this.userdetails.userId}?access_token=${this.userdetails.id}`).subscribe(res=>{
            this.userrole = localStorage.getItem("roleuser");
            console.log("check",this.userrole);
            if(this.userrole == "admin")
            {
              console.log("test");
              this.authservice.logout();
              // localStorage.removeItem('currentUser');
              alert('admin trying to login through user panel');
              location.reload();
            }        
          });         
        },
        error: err => {
          alert("error login");
        }
      });  
    }
  
    onSubmitAdmin(){
      var adminemailid = this.AdminLoginForm.value.admin_email;
      var adminpassword = this.AdminLoginForm.value.admin_password;
      this.authservice.login(adminemailid, adminpassword).subscribe({
        next :Response => {
          this.userdetails = Response;
          console.log("user",this.userdetails)
          this.http.get(`${Urls.USERS}/${this.userdetails.userId}?access_token=${this.userdetails.id}`).subscribe(res=>{
            this.userrole = localStorage.getItem("roleuser");
            console.log("check",this.userrole);
            if(this.userrole == "user")
            {
              console.log("test");
              this.authservice.logout();
              // localStorage.removeItem('currentUser');
              alert('user trying to login through user panel');
              location.reload();
            }        
          });       
        },
        error: err => {
          alert("error login");
        }
      });
    }

  onRegister(){
    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var role = this.profileForm.value.role;
    var mobile=this.profileForm.value.mobile;
    var email=this.profileForm.value.email;
    var password=this.profileForm.value.password;
    var username=this.profileForm.value.username; 
  if(role === 'user'){
    console.log("user")
    this.http.post<any>(`${Urls.ECOUSER}`,{firstname,lastname,role,mobile,username,email,password}).subscribe(res =>{
      console.log(res);
      alert("registration successful");
      location.reload();
     })
  }
  else if(role === 'admin'){
    console.log("admin");
    this.authservice.register(firstname, lastname, role, email, password, username, mobile).subscribe({
      next: Response => {
        console.log(Response);
        alert("request accepted");
        location.reload();
       
      },
      error: err => {
        alert("registration failed");
      }   
    });
  }
  
  }

  register(){
    const log=document.getElementById("log");
    const reg=document.getElementById("reg");
    const userlog =document.getElementById("userlog");
    const adminlog = document.getElementById("adminlog");
    if(log && reg && userlog && adminlog){
      log.style.display='none';
      userlog.style.display='none';
      adminlog.style.display='none';
      reg.style.display='block';
    }
  }

  login(){
    const log=document.getElementById("log");
    const reg=document.getElementById("reg");
    const userlog =document.getElementById("userlog");
    const adminlog = document.getElementById("adminlog");
    const usertab =document.getElementById("tab-user");
    const admintab =document.getElementById("tab-admin");
    const openuser=document.getElementById("userlogin");
    const openadmin=document.getElementById("adminlogin");
    if(log && reg && userlog && adminlog && admintab &&usertab && openuser && openadmin){
      log.style.display='block';
      userlog.style.display='block';
      usertab.style.color=' #1D5C63';
      usertab.style.textDecoration='underline';
      reg.style.display='none';
      adminlog.style.display='none';
      admintab.style.color='rgba(29, 92, 99, 0.5)';
      admintab.style.textDecoration='none';
      openuser.style.display='block';
      openadmin.style.display='none';
    }
  }

  openuser(){
    const openuser=document.getElementById("userlogin");
    const openadmin=document.getElementById("adminlogin");
    const adminlog = document.getElementById("adminlog");
    const userlog = document.getElementById("userlog");
    const usertab =document.getElementById("tab-user");
    const admintab =document.getElementById("tab-admin");
    if(openuser && openadmin && adminlog && userlog && usertab && admintab){
      openuser.style.display='block';
      userlog.style.display='block';
      usertab.style.color=' #1D5C63';
      usertab.style.textDecoration='underline';
      openadmin.style.display='none';
      adminlog.style.display='none';
      admintab.style.color='rgba(29, 92, 99, 0.5)';
      admintab.style.textDecoration='none';      
    }
  }

  openadmin(){
    const openuser=document.getElementById("userlogin");
    const openadmin=document.getElementById("adminlogin");
    const adminlog = document.getElementById("adminlog");
    const userlog = document.getElementById("userlog");
    const usertab =document.getElementById("tab-user");
    const admintab =document.getElementById("tab-admin");
    if(openuser && openadmin && adminlog && userlog && usertab && admintab){
      openuser.style.display='none';
      userlog.style.display='none';
      usertab.style.color='rgba(29, 92, 99, 0.5)';
      usertab.style.textDecoration='none';
      openadmin.style.display='block';
      adminlog.style.display='block';
      admintab.style.color='#1D5C63';
      admintab.style.textDecoration='underline';
    }
  }

  
}
  




