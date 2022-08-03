import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  term:any
  productlist:any
  cuser:any
  activeuser:any
  eprod:any
  pid:any
  
  constructor(private http:HttpClient) { }

  editproductForm = new FormGroup({
    nameproduct: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    serial: new FormControl(''),
    brand: new FormControl(''),
    year: new FormControl('')
  });

  ngOnInit() {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser)           
    });

    this.productcall();   
  }

  productcall(){
    this.http.get(`${Urls.PRODUCT}`).subscribe((res:any) =>{
      this.productlist=res;
      console.log(this.productlist);  
    });

    var add = document.getElementById("add");
    if(add){
      add.style.display = 'block';
    }
    var edit = document.getElementById("edit");
    if(edit){
      edit.style.display = 'none';
    }
  }
  pname:any
  pquantity:any
  pdesc:any
  ploc:any
  pserial:any
  pbrand:any
  pyear:any
  editproduct(p:any){
    var add = document.getElementById("add");
    if(add){
      add.style.display = 'none';
    }
    var edit = document.getElementById("edit");
    
    if(edit){
      edit.style.display = 'block';
      console.log(edit)
    }
    
    this.pname = p.name;
    this.pquantity = p.quantity;
    this.pdesc = p.description;
    this.ploc = p.location;
    this.pserial = p.serial;
    this.pbrand = p.brand;
    this.pyear = p.year;
    
    console.log(this.pid);
  }

  deleteproduct(p:any){
    console.log(p);
    this.http.delete(`${Urls.PRODUCT}/${p.id}?access_token=${this.cuser.id}`).subscribe(res=>{
      console.log(res);
      alert("product deleted");
      location.reload();
    })
  }

  onSave(){
    console.log(this.eprod);
    this.http.patch(`${Urls.PRODUCT}/${this.pid}?access_token=${this.cuser.id}`,{
      "name" : this.editproductForm.value.nameproduct,
      "description": this.editproductForm.value.description,
      "quantity": this.editproductForm.value.quantity,
      "brand": this.editproductForm.value.brand,
      "location": this.editproductForm.value.location,
      "serial": this.editproductForm.value.serial,
      "year": this.editproductForm.value.year
    }).subscribe(res=>{
      console.log("patch",res);
      alert("product info updated");
    });
    var add = document.getElementById("add");
    if(add){
      add.style.display = 'block';
    }
    var edit = document.getElementById("edit");
    if(edit){
      edit.style.display = 'none';
    }

  }

  cancel(){
    var add = document.getElementById("add");
    if(add){
      add.style.display = 'block';
    }
    var edit = document.getElementById("edit");
    if(edit){
      edit.style.display = 'none';
    }
  }

  cancelbtn(){
    const open = document.getElementById("id01");
    open.style.display = 'none';
  }

  opendeletepopup(){
    const open = document.getElementById("id01");
    open.style.display = 'block';
  }

}
