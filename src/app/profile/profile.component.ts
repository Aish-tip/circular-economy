import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
 activeuser :any;
  constructor( private http:HttpClient) {}

  editform = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    mobile: new FormControl('')
  });
   
   
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.user);
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser)
           
    })
  }

  save_modified_form(){
    const p1 = document.getElementById("profile_details");
    const p2 = document.getElementById("profile_edit");
    if(p1 && p2){
      p1.style.display = "block";
      p2.style.display = "none";
    }
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    var fname = this.editform.value.firstname;
    var lname = this.editform.value.lastname;
    var email = this.editform.value.email;
    var uname = this.editform.value.username;
    var mbl = this.editform.value.mobile;
    this.http.patch(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`,{
      "firstname" : fname,
      "lastname" : lname,
      "email" : email,
      "username" : uname,
      "mobile" : mbl
    }    
    ).subscribe( ((res:any) =>{
        console.log(res);
    }
    ))
  }

  editdetails(){
    const p1 = document.getElementById("profile_details");
    const p2 = document.getElementById("profile_edit");
    if(p1 && p2){
      p1.style.display = "none";
      p2.style.display = "block";
    }
  }
}
  
  
  


