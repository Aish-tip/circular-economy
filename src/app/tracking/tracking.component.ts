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
  username:any=[]
  user_name:any
  details:any
  total:any= []
  element:any
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    console.log("cuser",this.user);
    this.http.get(`${Urls.USERS}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.activeuser = res;
      // this.user_name = this.activeuser.firstname;
      // console.log("user",this.user_name);           
    })    

    this.http.get(`${Urls.RITEM}?access_token=${this.user.id}`)
    .subscribe ((res :any)=>{
      console.log(res);
      this.item=res;
      
    })
    
    this.http.get(`${Urls.RITEM}?access_token=${this.user.id}`)
    .subscribe ((res :any)=>{
      this.details = res;
      for(let i=0;i<this.details.length;i++){
        if(this.details[i].employeeid == this.user.userId){
          console.log("print");
          this.username = this.details[i];
          console.log("prod",this.username)          
        } 
        this.total=this.total.concat(this.username);     
      }
      this.total=this.total.filter(
        (element: any,i: any) => i == this.total.indexOf(element)
      );
      console.log("total",this.total)   
    })
    // this.totalprods=[]             
  }

 getreviewstatus(t:any){
  console.log("review",t);
  var order = document.getElementById("order");
  if(t.track[0].review == true){
    console.log("true")
    order.classList.add("completed");    
  }
 }

  getprocessstatus(t:any){
    // let color = 'red';
    var process = document.getElementById("process");
    if(t.track[0].process == true){
      // color = '	#32CD32';
      process.classList.add("completed")
    }
    // return color;
  }

    getacceptstatus(t:any){
      // let color = 'red';
      var accept = document.getElementById("accept");
      if(t.track[0].accept == true){
        // color = '	#32CD32';
        accept.classList.add("completed")
      }
      
    
      }

      getdeliverstatus(t:any){
        // let color = 'red';
        var deliver = document.getElementById("deliver");
        if(t.track[0].deliver == true){
          // color = '	#32CD32';
          deliver.classList.add("completed")
        }
        // return color;
      
        }

}
