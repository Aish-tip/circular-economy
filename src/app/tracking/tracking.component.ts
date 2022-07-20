import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  constructor(private authservice:AuthService,private http:HttpClient) { }
  user:any
  activeuser:any
  item:any
  review:any
  show:any
  username:any
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log("cuser",this.user);
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.activeuser = res;
      this.username = this.activeuser.firstname;
      console.log("user",this.username);           
    })    

    this.http.get(`${Urls.RITEM}?access_token=${this.user.id}`)
    .subscribe ((res :any)=>{
      console.log(res);
      this.item=res;
      
    })
    
    // this.http.get(`http://3.111.188.154:3000/api/requestItems?filter[where][employeename]=${this.username}`)
    // .subscribe ((res :any)=>{
    //   console.log(res);
    //   // http://3.111.188.154:3000/api/requestItems?filter[where][employeename]=aishu
    //   // `${Urls.RITEM}?filter[where][employeename]=${this.username}`
    // })


             
  }

 getreviewstatus(t:any){
  let color = 'red';
  if(t.track[0].review == true){
    color = '	#32CD32';
  }
  return color;

  }

  getprocessstatus(t:any){
    let color = 'red';
    if(t.track[0].process == true){
      color = '	#32CD32';
    }
    return color;
  
    }

    getacceptstatus(t:any){
      let color = 'red';
      if(t.track[0].accept == true){
        color = '	#32CD32';
      }
      return color;
    
      }

      getdeliverstatus(t:any){
        let color = 'red';
        if(t.track[0].deliver == true){
          color = '	#32CD32';
        }
        return color;
      
        }

}
