import { Component,  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authservice:AuthService,private http : HttpClient, private router :Router,private tokenStorage: TokenStorageService) {}

    LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
    });

    profileForm = new FormGroup({
      firstname: new FormControl(''),
      lastname:new FormControl(''),
      mobile:new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''), 
      password: new FormControl('')        
    });

  onSubmit() { 
    var emailid = this.LoginForm.value.email;
    var password = this.LoginForm.value.password;
    this.authservice.login(emailid, password).subscribe({
      next :Response => {
        console.log(Response);
        this.router.navigate(['/landing']);
      },
      error: err => {
        alert("error login");
      }
    });

    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var mobile=this.profileForm.value.mobile;
    var email=this.profileForm.value.email;
    var password=this.profileForm.value.password;
    var username=this.profileForm.value.username; 
    this.authservice.register(firstname, lastname, email, password, username, mobile).subscribe({
    next: Response => {
      console.log(Response);
      this.router.navigate(['/login']);
      alert("registration successful");
      // this.isSuccessful = true;
      // this.isSignUpFailed = false;
    }    
  });    
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

  ngOnInit(): void {}
}
  




