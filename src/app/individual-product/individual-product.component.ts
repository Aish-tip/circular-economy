import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-individual-product',
  templateUrl: './individual-product.component.html',
  styleUrls: ['./individual-product.component.css']
})
export class IndividualProductComponent implements OnInit {
  id:any
  pd:any
  cuser:any
  activeuser:any
  activeusername:any
  constructor(private route: ActivatedRoute,private http:HttpClient,public datepipe: DatePipe) { }
  productStock:any
  ngOnInit(): void {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      this.activeusername = this.activeuser.firstname;
      console.log(this.activeuser)           
    })
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.http.get(`${Urls.PRODUCT}/${this.id}`).subscribe(res=>{
      console.log(res);
      this.pd = res;
      this.productStock=this.pd.quantity;
      // this.pd.map((item:any)=> {
      //   item.value = 1;
      //   })
      //   console.log("pd",this.pd)
    })
  }

  role1:any
  admin1:any
  user1:any
  LoggedIn1(){
    if(localStorage.getItem('currentUser'))
    {
      this.role1= sessionStorage.getItem("role");
      // console.log(this.role);
      if(this.role1 == 'admin')
      {
        this.admin1=true;
      }
      else if(this.role1== 'user')
      {
        this.user1=true;
      }
      return true;
    }
    else{
      return false;
    }    
  }

  value=1
  // tmp:any[]=[]
  quantity:any;
  increment(){
    console.log(this.value);
    // console.log(p.quantity)
    if(this.value < this.productStock)
    {
      this.value++; 
      console.log("after if",this.value)
    }
  }

  decrement(){
    if(this.value > 1){
      this.value--;
    }     
  }
  productname:any

  openpop(p:any){
    console.log("product",p)
    this.productname = p.name;
    this.productStock = p.quantity;
    this.productStock= this.productStock - this.value;
    // console.log("active user",this.cuser.userId);
    // console.log("name",this.activeuser.firstname)
    // console.log("stock",this.productStock)
    // console.log("qty",this.value);
    // console.log("value",this.productname)
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
      console.log(currentDateTime);
    this.http.post<any>(`${Urls.RITEM}`,
    {"employeename": this.activeuser.firstname,
      "employeeid": this.cuser.userId,
      "name": this.productname,
      "quantity": this.value,
      "requestDate": currentDateTime,
      "track":[ {
        "review": false,
        "reviewdate":'',
        "process": false,
        "processdate": '',
        "accept": false,
        "acceptdate": '',
        "deliver": false,
        "deliverdate":''
      }]
    }).subscribe(Response =>{
      const success = document.getElementById("id02");
      success.style.display = 'block';
        console.log(Response);
        // alert("successful");
    });  
    this.http.patch(`${Urls.PRODUCT}/${p.id}`,{
      "quantity":this.productStock
    }).subscribe(res=>{
      console.log("patchstock",res);
      // location.reload();
    })   
  }

  okaypopup(){
    const open = document.getElementById("id02");
    open.style.display = 'none';
    location.reload();
  }

}
