import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Urls } from '../constants/urls';
import { map } from 'rxjs/operators';
// const AUTH_API = 'http://localhost:3000/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,  private router: Router) { }



  login(email: any, password: any): Observable<any> {
    return this.http.post<any>(`${Urls.LOGIN}`, {email, password, returnSecureToken: true})
    .pipe(map(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      // console.log('user',JSON.stringify(user))
      this.http.get(`${Urls.USERS}/${user.userId}?access_token=${user.id}`).subscribe(res => {
        let data: any = res;
        localStorage.setItem("userName", data.username);
        sessionStorage.setItem('role',data.role);  
        localStorage.setItem("roleuser",data.role);
        // console.log("check",localStorage.getItem("roleuser"));      
      });
      if (user && user.id) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        

      }
      this.router.navigate(['/landing']);
      // location.reload();
      return user;
    }));
        
  }

  logout(user: { id: any; }) {
    // localStorage.removeItem('currentUser');
    // this.router.navigate(['/login']);
    this.http.post<any>(`${Urls.LOGOUT}?access_token=${user.id}`, {}).subscribe((res: any) => {
      console.log(res);
      console.log("Logged out");
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userName');
      // localStorage.removeItem('role');
      sessionStorage.clear();
      this.router.navigate(['/login']);
    })

  }

  register(firstname:any, lastname:any, role:any, email:any, password:any, username:any, mobile:any): Observable<any> {
    return this.http.post(`${Urls.USERS}`, {firstname,lastname,role,username,email,password,mobile}, httpOptions);
  }
  addproduct(name:any, description:any, quantity:any, brand:any, location:any, serial:any, year:any): Observable<any>{
    return this.http.post('http://localhost:3000/api/products', {
      name,
      description,
      quantity,
      brand,      
      location,
      serial,      
      year
    }, httpOptions);
  }
 
}