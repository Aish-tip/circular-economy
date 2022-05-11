import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http : HttpClient, private router :Router) { }

  LoginForm = new FormGroup({
    email: new FormControl(''),
password: new FormControl('')

});
onSubmit() {   
//console.log(this.LoginForm.value);   

//var auth = JSON.stringify(this.LoginForm.value)
this.http.post('http://localhost:3000/api/Users/login',{email:this.LoginForm.value.email,password:this.LoginForm.value.password}).subscribe(Response => {
console.log(Response)

this.router.navigate(['/home']);


},(err:any) => {
  alert("error login");
}  
);

}

  ngOnInit(): void {
  }

}
