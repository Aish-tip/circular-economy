import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http : HttpClient) { }

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

    var body = JSON.stringify(this.profileForm.value)
    //console.log(body)
    this.http.post('http://localhost:3000/api/Users',{firstname:this.profileForm.value.firstname,lastname:this.profileForm.value.lastname,mobile:this.profileForm.value.mobile,email:this.profileForm.value.email,password:this.profileForm.value.password,username:this.profileForm.value.username,age:this.profileForm.value.age,gender:this.profileForm.value.gender,bgroup:this.profileForm.value.bgroup,role:this.profileForm.value.role}).subscribe(Response => {
      alert("registration successful");
    console.log(Response)
  });
  }

  ngOnInit(): void {
  }

}
