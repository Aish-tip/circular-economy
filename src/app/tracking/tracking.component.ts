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
  temp:any[]= []
  rditem:any
  reviewitem:any
  ngOnInit() {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser);           
    })    
    this.http.get(`${Urls.RITEM}?access_token=${this.cuser.id}`).subscribe(Response =>{
      this.item = Response;
      console.log("item",this.item);
      console.log(this.item.length);
      // this.rqdata(this.item);
      for(var i=0;i<this.item.length;i++){
        var trackinfo = {
          "name": this.item[i].employeename,
          "id": this.item[i].employeeid,
          "product":this.item[i].name,
          "quantity":this.item[i].quantity,
          "review":this.item[i].track[0].review
        }
        this.temp= this.temp.concat(trackinfo);
        if(trackinfo.review[i] == 'true'){
          this.rditem = this.temp[i];
          console.log("rditem",this.rditem)
        }
      }
    })         
  }


}
