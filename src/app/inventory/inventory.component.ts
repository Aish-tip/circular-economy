import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Urls } from '../constants/urls';
// import assetdata from '../data.json';

// interface Asset {  
//   id: Number;  
//   title: String;  
//   price: Number;
//   stock:Number;
//   image?:string;
  
// }  

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(private http:HttpClient) { }
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

    })
  }
  
}
