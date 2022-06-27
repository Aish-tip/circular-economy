import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import assetdata from '../data.json';
import { FormControl, FormGroup } from '@angular/forms';


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

  ngOnInit(): void {
    
  }

  requestForm = new FormGroup({
    employeename:new FormControl(''),
    name: new FormControl(''),
    quantity:new FormControl('')
  });

  openForm() {
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
  openpop(){
    
    console.log(this.requestForm.value)
    this.http.post<any>('http://3.111.188.154:3000/api/requestItems',{employeename:this.requestForm.value.employeename,name:this.requestForm.value.name, quantity:this.requestForm.value.quantity})
    .subscribe(Response =>{
        console.log(Response);
        alert("successful");
    })
    // const form = document.getElementById("myForm");
    // if(form){
    //   // alert("sucessful");
    //   form.style.display = "none";
    // }
  }

  
  data:Asset[]=assetdata;

}

