import { Component, OnInit } from '@angular/core';
import assetdata from '../data.json';

interface Asset {  
  id: Number;  
  title: String;  
  price: Number;
  stock:Number;
  image?:string;
  
}  

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  data:Asset[]=assetdata;
}
