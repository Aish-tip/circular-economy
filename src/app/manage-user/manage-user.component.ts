import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {
  userlist: any;
  term:any
  cuser:any
  activeuser:any
  constructor(private http:HttpClient,private authservice:AuthService) { }

  ngOnInit(): void {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser)           
    })  

    this.http.get(`${Urls.ECOUSER}?access_token=${this.cuser.id}`).subscribe(Response =>{
      console.log(Response);
      this.userlist = Response;
    });

    this.http.get(`${Urls.USERS}?access_token=${this.cuser.id}`).subscribe(res=>{
      console.log(res);
    })
  }

  adduser(u:any){
    this.authservice.register(u.firstname, u.lastname, u.role, u.email, u.password, u.username, u.mobile).subscribe({
      next: Response => {
        console.log(Response);
        alert("request accepted");
        location.reload();
       
      },
      error: err => {
        // alert("registration failed");
      }   
    });

    this.http.delete(`${Urls.ECOUSER}/${u.id}?access_token=${this.cuser.id}`).subscribe((res=>{
      console.log(res);
      // alert("request deleted")
      location.reload();
    }));
  }

  deleteuser(user: any){  
    this.http.delete(`${Urls.ECOUSER}/${user.id}?access_token=${this.cuser.id}`).subscribe((res=>{
      console.log(res);
      alert("request deleted")
      location.reload();
    }));
  }


}
