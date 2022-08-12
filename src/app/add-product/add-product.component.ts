import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

function base64toBlob(base64Data: string, contentType: string) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  
  dashboard = true;
  user = false;
  userslist = false;
  product = false;
  request = false;
  userlist: any;
  item: any;
  formDataToUpload: any
    imagePick: any;
  generatedImage: any;
  finalimageFile: any;
  generateName: any
  term: string;
  userListName:any
  productlist:any

  constructor(private authservice:AuthService,private http:HttpClient, public datepipe: DatePipe,private router:Router){ }

  productForm = new FormGroup({
    nameproduct: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    serial: new FormControl(''),
    brand: new FormControl(''),
    year: new FormControl('')
  });


  editproductForm = new FormGroup({
    nameproduct: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    serial: new FormControl(''),
    brand: new FormControl(''),
    year: new FormControl('')
  });

  cuser:any
  activeuser:any
  ngOnInit(): void {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.cuser);
    this.http.get(`${Urls.USERS}/${this.cuser.userId}?access_token=${this.cuser.id}`).subscribe((res: any) => {
      this.activeuser = res;
      console.log(this.activeuser)           
    })    
  } 

  onImagePicked(imageData: string | File) {
    let imageFile;
    // console.log(imageData)
    if (typeof imageData == 'string') {
      console.log(imageData)
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg')
        const imageName: string = this.generateName();
        // this.finalimageFile = new File([imageFile], imageName, {
        //   type: "image/jpeg"
        // });
        this.formDataToUpload = new FormData();
        this.formDataToUpload.append("files", imageFile, imageName);
        console.log(imageFile, this.formDataToUpload)
      } catch (err) {
        console.log("Error", err)
      }

    } else {
      imageFile = imageData;
      const ina: string = this.generateName;
      this.formDataToUpload = new FormData();
      this.formDataToUpload.append("files", imageFile, ina);
      this.finalimageFile = new File([imageFile], ina, {
        type: "image/jpeg"
      });
    }   
  }
  pickedFilename: any
  processFile(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    this.selecteImage = pickedFile;
    this.onImagePicked(pickedFile)
    if (!pickedFile) {
      return
    }
    const fr = new FileReader();
    fr.onload = () => {
      const du = fr.result?.toString();
      this.selecteImage = du;
      // this.onImagePicked(this.selecteImage)
    }
    fr.readAsDataURL(pickedFile)
    console.log(fr, pickedFile)
    this.pickedFilename = this.selecteImage.name;
    // console.log("image-name",this.selecteImage.name)
  }   

  onSubmit(){
    var name = this.productForm.value.nameproduct;
    var qty = this.productForm.value.quantity;
    var dsc = this.productForm.value.description;
    var loc = this.productForm.value.location;
    var srl = this.productForm.value.serial;
    var brand = this.productForm.value.brand;
    var year = this.productForm.value.year;
    this.authservice.addproduct(name, dsc, qty, brand, loc, srl, year, this.pickedFilename).subscribe({
      next:Response => {
        console.log(Response);
        const success = document.getElementById("id02");
        success.style.display = 'block';
        location.reload();
      },
      error:err => {
        alert("product addition failed")
      }
    });    
    console.log("imgname",this.pickedFilename)
  } 

    func_dashboard(e: any){
      console.log(e);
      this.dashboard = true;
      this.product = false;
      this.user = false;
      this.request = false;
      this.userslist = false;

    }
    
    func_user(e: any){
      console.log(e);
      this.http.get(`${Urls.ECOUSER}`).subscribe(Response =>{
        console.log(Response);
        this.userlist = Response;
      });
      
      this.dashboard = false;
      this.product = false;
      this.user = true;
      this.request = false;
      this.userslist = false;
    }
    users:any
    func_userlist(e:any){
      this.userslist = true;
      this.dashboard = false;
      this.product = false;
      this.user = false;
      this.request = false;
      this.http.get(`${Urls.ULIST}`).subscribe(res=>{
        this.users=res;
        console.log(res);
      })
     
    }
    acceptuser:any
    adduser(u:any){
      this.authservice.register(u.firstname, u.lastname, u.role, u.email, u.password, u.username, u.mobile).subscribe({
        next: Response => {
          const success = document.getElementById("id02");
      success.style.display = 'block';
          this.acceptuser = Response; 
          console.log(this.acceptuser);  
          this.http.post(`${Urls.ULIST}`,{
            "Userid": this.acceptuser.id,
            "firstname": this.acceptuser.firstname,
            "lastname": this.acceptuser.lastname,
            "mobile": this.acceptuser.mobile,
            "username": this.acceptuser.username,
            "email": this.acceptuser.email,
            "role": this.acceptuser.role
          }).subscribe(res=>{
            console.log("userlist", res)
          });
          // location.reload();      
        },
        error: err => {
          // alert("registration failed");
        }   
      });

      this.http.delete(`${Urls.ECOUSER}/${u.id}?access_token=${this.cuser.id}`).subscribe((res=>{
        console.log(res);
        // alert("request deleted")
        // location.reload();
      }));
    }

    deleteuser(user: any){  
      this.http.delete(`${Urls.ECOUSER}/${user}?access_token=${this.cuser.id}`).subscribe((res=>{
        console.log(res);
        alert("request deleted")
        location.reload();
      }));
    }

    func_request(e: any){
      console.log(e);
      this.http.get(`${Urls.RITEM}?access_token=${this.cuser.id}`).subscribe(Response =>{
      this.item = Response;
      console.log(this.item)
        })
      this.dashboard = false;
      this.product = false;
      this.user = false;
      this.request = true; 
      this.userslist = false;     
    }    

    func_product(e:any){
      this.dashboard = false;
      this.user = false;
      this.product = true;
      this.request = false;
      this.userslist = false;
      this.http.get(`${Urls.PRODUCT}?access_token=${this.cuser.id}`).subscribe((res:any) =>{
        this.productlist=res;
        console.log(this.productlist);  
      })
      var add = document.getElementById("add");
      if(add){
        add.style.display = 'block';
      }
      var edit = document.getElementById("edit");
      if(edit){
        edit.style.display = 'none';
      }
    }

    selecteImage: any;
    uploadFile() {
      this.http.post<{ imageUrl: string, imagePath: string }>(`${Urls.CONTAINER}/images/upload`, this.formDataToUpload)
      .subscribe (res => {
        console.log(res)
        this.selecteImage = null;
        // this.presentToast('Image Uploaded', 'success', '200')
  
      }, err => {
        console.log(err)
      })
    }

    deletephoto() {
      this.selecteImage = null;
      // this.presentToast('Image removed', 'danger', '200')  
    }

    searchtext : string = '';
    onSearchTextEntered(searchvalue:string){
      this.searchtext = searchvalue;
      console.log(this.searchtext);
    }


    bgcolor:any   

    reviewbg:any
    reviewtime:any
    // reviewid:any
    reviewRequest(r:any,i:any){
      var order = document.getElementById("order"+ i);
      order.classList.add("completed"); 
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
      // this.reviewtime= currentDateTime;
      // console.log(this.reviewtime);
      this.http.patch(`${Urls.RITEM}/${r.id}`,{
        "track":[{
          "review":true,
          "process":false,
          "accept":false,
          "deliver":false
        }]
      }).subscribe(res=>{
        const success = document.getElementById("id02");
        success.style.display = 'block';
        this.reviewbg = res; 
        console.log("reviewbg",this.reviewbg);   
        alert("request under review");     
        // this.reviewtime= this.reviewbg.track[0].reviewdate;
        // console.log("time",this.reviewtime)
        // location.reload();   
      })            
    }     
    review:any
    processtime:any
    processbg:any
    processRequest(r:any,i:any){
      var process = document.getElementById("process"+i);
      process.classList.add("completed"); 
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');  
      console.log(currentDateTime);
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true, 
          "process":true,
          "accept":false,
          "deliver":false         
        }]
      }).subscribe(res=>{
        const success = document.getElementById("id02");
      success.style.display = 'block';
        this.processbg = res;
        console.log(this.processbg);
        // alert("request processed");
        // location.reload();
        // this.processtime = this.processbg.track[0].processdate;
        // console.log(this.processtime);

      })
    }

    acceptRequest(r:any,i:any){   
      var accept = document.getElementById("accept" + i);
      accept.classList.add("completed");
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true,
          "process":true,
          "accept":true,
          "deliver":false           
        }]
      }).subscribe(res=>{
        const success = document.getElementById("id02");
      success.style.display = 'block';
        console.log(res);
        // alert("request accepted");
        // location.reload();
      })
    }

    deliverRequest(r:any,i:any){       
      var deliver = document.getElementById("deliver" + i);
      deliver.classList.add("completed");
      let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true,
          "process":true,
          "accept":true,
          "deliver":true,
           "deliverdate": currentDateTime       
        }]
      }).subscribe(res=>{
        const success = document.getElementById("id02");
      success.style.display = 'block';
        console.log(res);
        // const deliver = document.getElementById("deliver");
        // alert("request delivered");
        // location.reload();
      })
    }

    deleterequest(r:any){
      console.log("test")
      console.log(r);
      this.http.delete(`${Urls.RITEM}/${r}?access_token=${this.cuser.id}`).subscribe(res=>{
        console.log(res);
        alert("request deleted");
        location.reload();
      })
    }

    eprod:any
    editproduct(p:any){      
      this.dashboard = false;
      this.user = false;
      this.product = true;
      this.request = false;
      var add = document.getElementById("add");
      if(add){
        add.style.display = 'none';
      }
      var edit = document.getElementById("edit");
      
      if(edit){
        edit.style.display = 'block';
        console.log(edit)
      }
      this.eprod = p;
      this.pid = this.eprod.id;
      console.log(this.pid);
    }

    deleteproduct(p:any){
      console.log(p);
      this.http.delete(`${Urls.PRODUCT}/${p}?access_token=${this.cuser.id}`).subscribe(res=>{
        console.log(res);
        alert("product deleted");
        location.reload();
      })
    }
    pid:any
    

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
        const success = document.getElementById("id02");
      success.style.display = 'block';
        // alert("product info updated");
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


    closeForm(){
      var pop = document.getElementById("popupForm");
      if(pop){
        pop.style.display = 'none';
      }
    }

    getdcolor(){      
      var color= '#838383';
      if(this.dashboard == true){
        color= '#417D7A';
      }      
      return color;
    }

    getpcolor(){      
      var color= '#838383';
      if(this.product == true){
        color= '#417D7A';
      }
      return color;
    }

    getucolor(){      
      var color= '#838383';
      if(this.user == true){
        color= '#417D7A';
      }
      return color;
    }

    getulcolor(){
      var color= '#838383';
      if(this.userslist == true){
        color= '#417D7A';
      }
      return color;
    }

    getrcolor(){      
      var color= '#838383';
      if(this.request == true){
        color= '#417D7A';
      }
      return color;
    }
    rid:any
    opendeletepopup(r:any){
      this.rid= r.id;
      const open = document.getElementById("id01");
      open.style.display = 'block';
      // console.log(r);
    }
    prodid:any
    opendeleteproduct(r:any){
      this.prodid= r.id;
      const open = document.getElementById("id01");
      open.style.display = 'block';
    }
    uid:any
    opendeletepop(u:any){
      this.uid = u.id;
      const open = document.getElementById("id01");
      open.style.display = 'block';
    }
    ulid:any
    opendeleteuser(r:any){
      this.ulid = r.id;
      const open = document.getElementById("id01");
      open.style.display = 'block';
    }
    individualuser:any
    iufirstname:any
    iulastname:any
    iumobile:any
    iuusername:any
    iuemail:any
    iuid:any
    userrequest:any
    username:any
    total:any = []
    deliverdate:any
    getuserdetails(l:any,i:any){
      console.log(l);
      // this.router.navigate(['/user-details',l.id]);
      this.http.get(`${Urls.ULIST}/${l.id}`).subscribe(res=>{
        this.individualuser = res;
        this.iuid = this.individualuser.Userid;
        this.iufirstname = this.individualuser.firstname;
        this.iulastname = this.individualuser.lastname;
        this.iumobile = this.individualuser.mobile;
        this.iuusername = this.individualuser.username;
        this.iuemail = this.individualuser.email;
      })  
      this.http.get(`${Urls.RITEM}`).subscribe(res=>{
        this.userrequest = res;
        console.log(this.iuid);
        for(let i=0;i<this.userrequest.length;i++){
          if(this.userrequest[i].employeeid == this.iuid && this.userrequest[i].track[0].deliver == true)
          {
            console.log("print");
            this.username = this.userrequest[i];
            console.log("prod",this.username)          
          } 
          this.total=this.total.concat(this.username);    
        }   
        console.log("before filter",this.total)
        this.total=this.total.filter(
          (element: any,i: any) => this.total.indexOf(element) == i
        );        
        console.log("ritem",this.total);        
      })
      const u = document.getElementById("userlist");
      u.style.display="none";

      const ul = document.getElementById("userdesc");
      ul.style.display = "block";
    }

    cancelbtn(){
      const open = document.getElementById("id01");
      open.style.display = 'none';
    }
    
    okaypopup(){
      const open = document.getElementById("id02");
      open.style.display = 'none';

    }
  }


