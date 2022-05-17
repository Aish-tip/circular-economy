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
      next: data => {
        // this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        console.log(data);
        this.router.navigate(['/profile']);
      },
      error: err => {
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
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
    if(log && reg){
      log.style.display='none';
      reg.style.display='block';
    }
  }
  login(){
    const log=document.getElementById("log");
    const reg=document.getElementById("reg");
    if(log && reg){
      log.style.display='block';
      reg.style.display='none';
    }
  }

  ngOnInit(): void {}
}
  




