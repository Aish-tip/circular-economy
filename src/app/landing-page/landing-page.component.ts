import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import assetdata from '../data.json';
import { FormControl, FormGroup } from '@angular/forms';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';


interface Asset {  
  id: Number;  
  title: String;  
  price: Number;
  stock:Number;
  image?:string;
  
}
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private http:HttpClient,public datepipe: DatePipe) { }
  cuser:any
  activeuser:any
  productlist:any
  activeusername:any
  ngOnInit(): void {
    
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      this.activeusername = this.activeuser.firstname;
      console.log(this.activeuser)           
    })
    this.http.get(`${Urls.PRODUCT}?access_token=${this.cuser.id}`).subscribe((res:any) =>{
      this.productlist=res;
      console.log(this.productlist);
      this.productlist.map((item:any)=> {
        item.value = 1;
        })
    })

    this.imagecall();
  }
  images:any
  imagecall(){
    this.http.get(`${Urls.CONTAINER}/images/files`).subscribe(res => {
      console.log(res);
      // this.presentToast('Image loaded', 'primary', '200')
      this.images = res;
    })
  }
content:any
  newArray: any
  searchThis(data:any) {
    this.content = this.newArray
    console.log(data)
    if (data) {
      this.content = this.content.filter(function (ele:any, i:any, array:any=[]) {
        let arrayelement = ele.name.toLowerCase()
        return arrayelement.includes(data)
      })
    }
    else {
      console.log(this.content)
    }
    console.log(this.content)
  }


  requestForm = new FormGroup({
   
    quantity:new FormControl('')
  });
  productname:any
  productStock:any
  qty:number

  openpop(p:any){
    console.log("product",p)
    this.productname = p.name;
    this.productStock = p.quantity;
    // console.log("active user",this.cuser.userId);
    // console.log("name",this.activeuser.firstname)
    // console.log("stock",this.productStock)
    // console.log("qty",this.value);
    // console.log("value",this.productname)
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
      console.log(currentDateTime);
    this.http.post<any>(`${Urls.RITEM}`,
    {"employeename": this.activeuser.firstname,
      "employeeid": this.cuser.userId,
      "name": this.productname,
      "quantity": this.value,
      "requestDate": currentDateTime,
      "track":[ {
        "review": false,
        "reviewdate":'',
        "process": false,
        "processdate": '',
        "accept": false,
        "acceptdate": '',
        "deliver": false,
        "deliverdate":''
      }]
    }).subscribe(Response =>{
        console.log(Response);
        alert("successful");
    });    
  }

  value=1
  // tmp:any[]=[]
  quantity:any;
  increment(p:any){
    console.log(this.value);
    console.log(p.quantity)
    if(p.value < p.quantity)
    {
      p.value++; 
      console.log("after if",this.value)
    }
  }

  decrement(p:any){
    if(p.value > 1){
      p.value--;
    }     
  } 
  role1:any
  admin1:any
  user1:any
  LoggedIn1(){
    if(localStorage.getItem('currentUser'))
    {
      this.role1= sessionStorage.getItem("role");
      // console.log(this.role);
      if(this.role1 == 'admin')
      {
        this.admin1=true;
      }
      else if(this.role1== 'user')
      {
        this.user1=true;
      }
      return true;
    }
    else{
      return false;
    }    
  }


}

