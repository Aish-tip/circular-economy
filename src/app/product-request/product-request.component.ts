import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-request',
  templateUrl: './product-request.component.html',
  styleUrls: ['./product-request.component.css']
})
export class ProductRequestComponent implements OnInit {

  term:any
  item:any
  reviewbg:any
  processbg:any
  constructor(private http:HttpClient,public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.http.get(`${Urls.RITEM}`).subscribe(Response =>{
      this.item = Response;
      console.log(this.item)
        })
  }

  reviewRequest(r:any){     
    console.log(r);
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
    // this.reviewtime= currentDateTime;
    // console.log(this.reviewtime);
    this.http.patch(`${Urls.RITEM}/${r.id}`,{
      "track":[{
        "review":true,
        "process":false,
        "accept":false,
        "deliver":false
      }]
    }).subscribe(res=>{
      
      this.reviewbg = res;
      console.log("reviewbg",this.reviewbg);   
      alert("request under review");     
      // this.reviewtime= this.reviewbg.track[0].reviewdate;
      // console.log("time",this.reviewtime)
      location.reload();   
    })      
  }

  processRequest(r:any){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
    console.log(currentDateTime);
    this.http.patch(`${Urls.RITEM}/${r.id}`,{
      "track":[{
        "review":true, 
        "process":true,
        "accept":false,
        "deliver":false         
      }]
    }).subscribe(res=>{
      this.processbg = res;
      console.log(this.processbg);
      alert("request processed");
      location.reload();
      // this.processtime = this.processbg.track[0].processdate;
      // console.log(this.processtime);
    })
  }

  acceptRequest(r:any){      
    this.http.patch(`${Urls.RITEM}/${r.id}`,{
      "track":[{
        "review":true,
        "process":true,
        "accept":true,
        "deliver":false           
      }]
    }).subscribe(res=>{
      console.log(res);
      alert("request accepted");
      location.reload();
    })
  }

  deliverRequest(r:any){       
    this.http.patch(`${Urls.RITEM}/${r.id}`,{
      "track":[{
        "review":true,
        "process":true,
        "accept":true,
        "deliver":true          
      }]
    }).subscribe(res=>{
      console.log(res);
      // const deliver = document.getElementById("deliver");
      alert("request delivered");
      location.reload();
    })
  }

  opendeletepopup(){
    const open = document.getElementById("id01");
    open.style.display = 'block';
  }

  cancelbtn(){
    const open = document.getElementById("id01");
    open.style.display = 'none';
  }

  deleterequest(r:any){
    console.log("test")
    this.http.delete(`${Urls.RITEM}/${r.id}`).subscribe(res=>{
      console.log(res);
      alert("request deleted");
      location.reload();
    })
  }





}
