import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  constructor(private http : HttpClient,private authService: AuthService,private tokenStorage: TokenStorageService) { }

  profileForm = new FormGroup({
    firstname: new FormControl(''),
    lastname:new FormControl(''),
    mobile:new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    age:new FormControl(''),    
    password: new FormControl(''),
    
    
  });

  onSubmit() {   
    console.log(this.profileForm.value);  
    // var useremail:any;
    // var body = JSON.stringify(this.profileForm.value)
    //console.log(body)
    this.http.post('http://localhost:3000/api/Users',{firstname:this.profileForm.value.firstname,lastname:this.profileForm.value.lastname,mobile:this.profileForm.value.mobile,email:this.profileForm.value.email,password:this.profileForm.value.password,username:this.profileForm.value.username,age:this.profileForm.value.age,gender:this.profileForm.value.gender,bgroup:this.profileForm.value.bgroup,role:this.profileForm.value.role}).subscribe(Response => {
      alert("registration successful");
    console.log(Response);
    // useremail=this.profileForm.value.email;
    // console.log(useremail);
  });

  // this.authService.register(firstname, lastname, email, password, username, mobile, age).subscribe({
  //   next: data => {
  //     console.log(data);
  //     this.isSuccessful = true;
  //     this.isSignUpFailed = false;
  //   },
  //   error: err => {
  //     this.errorMessage = err.error.message;
  //     this.isSignUpFailed = true;
  //   }
  // });
  }

  ngOnInit(): void {
  }

}



// function firstname(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function lastname(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function email(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function password(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function username(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function mobile(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

// function age(firstname: any, lastname: any, email: any, password: any, username: any, mobile: any, age: any) {
//   throw new Error('Function not implemented.');
// }

