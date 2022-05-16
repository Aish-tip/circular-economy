import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  res=sessionStorage.getItem('resp');
    userid = sessionStorage.getItem('userid');  
    id = sessionStorage.getItem('id')
  constructor( private http:HttpClient) {}

    
  ngOnInit(): void {
    
    // this.http.get('http://localhost:3000/api/Users/'+this.id).subscribe(Response=>{
    //   console.log(Response);   
    // })  ;

    fetch('http://localhost:3000/api/Users/',{
      method:'GET',
      body: JSON.stringify({"id":this.id})

      })
      // .subscribe(Response => { console.log(Response)});
    }
      
      
      
  
  
  }


