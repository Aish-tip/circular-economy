import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor(private router:Router,private http : HttpClient,private authService: AuthService,private tokenStorage: TokenStorageService) { }

  profileForm = new FormGroup({
    firstname: new FormControl(''),
    lastname:new FormControl(''),
    mobile:new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''), 
    password: new FormControl('')  
    
  });

  onSubmit() {   
    var firstname = this.profileForm.value.firstname;
    var lastname = this.profileForm.value.lastname;
    var mobile=this.profileForm.value.mobile;
    var email=this.profileForm.value.email;
    var password=this.profileForm.value.password;
    var username=this.profileForm.value.username;   
    

  this.authService.register(firstname, lastname, email, password, username, mobile).subscribe({
    next: Response => {
      console.log(Response);
      this.router.navigate(['/login']);
      alert("registration successful");
      // this.isSuccessful = true;
      // this.isSignUpFailed = false;
    },
    error: err => {
      alert("registration failed");
      // this.errorMessage = err.error.message;
      // this.isSignUpFailed = true;
    }
  });
  }

  ngOnInit(): void {
  }

}




