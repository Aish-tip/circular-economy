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
  cuser:any
  activeuser:any
  item:any
  review:any
  show:any
  ngOnInit() {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log("user",this.activeuser);           
    })    

    this.http.get(`${Urls.RITEM}?filter=[where][employeeid]=${this.cuser.userId}&access_token=${this.cuser.id}`)
    .subscribe (res=>{
      console.log("item",res);
      this.item = res;
      for(let i=0;i<this.item.length;i++){
        // console.log(this.item.track[0].review)
      }
    })   
             
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
