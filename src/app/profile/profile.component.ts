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
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    // this.http.patch(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`,{
    //   "firstname" : this.editform.value.firstname,
    //   "lastname" : this.editform.value.lastname,
    //   "email" : this.editform.value.email,
    //   "username" : this.editform.value.username,
    //   "mobile" : this.editform.value.mobile
    // }    
    // ).subscribe( ((res:any) =>{
    //     console.log(res);
    // }
    // ))
  }
}
  
  
  


