import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// const AUTH_API = 'http://localhost:3000/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(email: any, password: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/Users/login', {
      email,
      password
    }, httpOptions);    
  }
  register(firstname:any, lastname:any, email:any, password:any, username:any, mobile:any): Observable<any> {
    return this.http.post('http://localhost:3000/api/Users', {
      firstname,
      lastname,
      username,
      email,
      password,
      mobile
    }, httpOptions);
  }
}