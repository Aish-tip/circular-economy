import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private authservice:AuthService,private http:HttpClient){ }

  productForm = new FormGroup({
    nameproduct: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    serial: new FormControl(''),
    brand: new FormControl(''),
    year: new FormControl('')
  });

  onSubmit(){
    var name = this.productForm.value.nameproduct;
    var qty = this.productForm.value.quantity;
    var dsc = this.productForm.value.description;
    var loc = this.productForm.value.location;
    var srl = this.productForm.value.serial;
    var brand = this.productForm.value.brand;
    var year = this.productForm.value.year;
    this.authservice.addproduct(name, qty, dsc, loc, srl, brand, year).subscribe({
      next:Response => {
        console.log(Response);
        location.reload();
      },
      error:err => {
        alert("product addition failed")
      }
    });    
  } 

  ngOnInit(): void {
  }

}
