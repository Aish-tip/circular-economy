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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
data:Asset[]=assetdata;
 

}
