import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import assetdata from '../data.json';
import { FormControl, FormGroup } from '@angular/forms';
import { Urls } from '../constants/urls';


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

  constructor(private http:HttpClient) { }
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

  requestForm = new FormGroup({
   
    quantity:new FormControl('')
  });
  productname:any
  productStock:any
  qty:number
  
  openForm(p:any) {
    console.log(p)
    this.productname = p.name;
    this.productStock = p.quantity;
    const form = document.getElementById("myForm");
    if(form){
      form.style.display = "block";
    }
  }  
  closeForm() {
    const form = document.getElementById("myForm");
    if(form){
      form.style.display = "none";
    }
  }
  value=1
  increment(){
    if(this.value < this.productStock){
      this.value++; 
    }
  }

  decrement(){
    if(this.value > 1){
      this.value--;
    }
     
  }

  openpop(){
    console.log(this.activeuser.userId);
    console.log(this.value);
    console.log(this.requestForm.value)
    this.http.post<any>(`${Urls.RITEM}`,
    {"employeename": this.activeuser.firstname,
      "employeeid": this.cuser.userId,
      "name": this.productname,
      "quantity": this.value,
      "track":[ {
        "review": false,
        "process": false,
        "accept": false,
        "deliver": false
      }
        
      ]
    })
    .subscribe(Response =>{
        console.log(Response);
        alert("successful");
    })
    const form = document.getElementById("myForm");
    if(form){
      form.style.display = "none";
    }
  }

  getproduct(p:any){
    console.log(p);
  }
  
 

}

