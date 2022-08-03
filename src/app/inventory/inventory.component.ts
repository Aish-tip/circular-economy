import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Urls } from '../constants/urls';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router,public datepipe: DatePipe) { }
  productlist:any
  cuser:any
  activeuser:any
  ngOnInit(): void {

    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser)
           
    })

    this.http.get(`${Urls.PRODUCT}?access_token=${this.cuser.id}`).subscribe((res:any) =>{
      this.productlist=res;
      console.log(this.productlist);
      this.productlist.map((item:any)=> {
        item.value = 1;
        })

    })
  }
  Stock:any
  productname:any
  productStock:any
  openpop(p:any){    
    console.log("product",p)
    this.productname = p.name;
    this.productStock = p.quantity;
    this.productStock= this.productStock - this.value;
    console.log("active user",this.cuser.userId);
    console.log("name",this.activeuser.firstname)
    console.log("stock",this.productStock)
    console.log("qty",this.value);
    console.log("value",this.productname)
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
      const success = document.getElementById("id02");
      success.style.display = 'block';
        console.log(Response);
        // alert("successful");
    });    
    // console.log("updated",this.Stock)
    this.http.patch(`${Urls.PRODUCT}/${p.id}`,{
      "quantity":this.productStock
    }).subscribe(res=>{
      console.log("patchstock",res);
      // location.reload();
    })
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

  getproductdetails(p:any){
    this.router.navigate(['/product-description',p.id]);
  }

  okaypopup(){
    const open = document.getElementById("id02");
    open.style.display = 'none';
    location.reload()

  }
}
