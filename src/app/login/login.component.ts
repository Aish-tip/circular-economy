import { Component,  OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http : HttpClient, private router :Router,private tokenStorage: TokenStorageService) {}

    LoginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
    });

  onSubmit() {  

    var emailid = this.LoginForm.value.email;
    console.log(emailid);
    this.http.post('http://localhost:3000/api/Users/login',{email:this.LoginForm.value.email,password:this.LoginForm.value.password})
      .subscribe(Response => { console.log(Response);
      var res = JSON.parse(JSON.stringify(Response));
      var at= res.acess_tokens;
      console.log(at);
      var userid = res.userId;
      var id= res.id;
      console.log(userid);
      console.log(id);
      console.log("hi")
      sessionStorage.setItem('resp',res);
      sessionStorage.setItem('userid', userid);
      sessionStorage.setItem('id',id);
      this.router.navigate(['/profile']);
        },(err:any) => {
        alert("error login");
    });
  }

  ngOnInit(): void {}
}
  




