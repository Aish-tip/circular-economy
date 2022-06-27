import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  item: any;

  constructor(private http:HttpClient) { }

  // items(){
  //   return this.http.get('http://localhost:3000/api/requestItems').subscribe(Response =>{
  //       this.item = Response;
  //   })
  // }
  
  

  ngOnInit(): void {
    this.http.get('http://3.111.188.154:3000/api/requestItems').subscribe(Response =>{
      this.item = Response;
  })
  }

}
