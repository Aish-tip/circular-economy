import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';
import { DatePipe } from '@angular/common';

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
  userslist:any
  userListName:any
  productlist:any

  constructor(private authservice:AuthService,private http:HttpClient, public datepipe: DatePipe){ }

  productForm = new FormGroup({
    nameproduct: new FormControl(''),
    quantity: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    serial: new FormControl(''),
    brand: new FormControl(''),
    year: new FormControl('')
  });

  editform = new FormGroup({
    pname: new FormControl(''),
    ploc: new FormControl(''),
    pstock: new FormControl('')
  });

  cuser:any
  activeuser:any
  ngOnInit(): void {
    this.cuser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log(this.user);
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
    }
    
    func_user(e: any){
      console.log(e);
      // this.http.get(`${Urls.USERS}`).subscribe(res=>{
      //   console.log(res);
      //   this.userslist = res;
      // })
      this.http.get(`${Urls.ECOUSER}`).subscribe(Response =>{
        console.log(Response);
        this.userlist = Response;
      });
      
      this.dashboard = false;
      this.product = false;
      this.user = true;
      this.request = false;
    }

    adduser(u:any){
      this.authservice.register(u.firstname, u.lastname, u.role, u.email, u.password, u.username, u.mobile).subscribe({
        next: Response => {
          console.log(Response);
          alert("request accepted");
          location.reload();
         
        },
        error: err => {
          alert("registration failed");
        }   
      });

      this.http.delete(`${Urls.ECOUSER}/${u.id}?access_token=${this.cuser.id}`).subscribe((res=>{
        console.log(res);
        alert("request deleted")
        location.reload();
      }));
    }

    deleteuser(user: any){  
      this.http.delete(`${Urls.ECOUSER}/${user.id}?access_token=${this.cuser.id}`).subscribe((res=>{
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
    }    
    func_product(e:any){
      this.http.get(`${Urls.PRODUCT}?access_token=${this.cuser.id}`).subscribe((res:any) =>{
        this.productlist=res;
        console.log(this.productlist);  
      })
      this.dashboard = false;
      this.user = false;
      this.product = true;
      this.request = false;
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
    reviewRequest(r:any){     
      console.log(r);
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
        
        this.reviewbg = res;
        console.log("reviewbg",this.reviewbg);   
        alert("request under review");     
        // this.reviewtime= this.reviewbg.track[0].reviewdate;
        // console.log("time",this.reviewtime)
        location.reload();   
      })      
       
    }  
    
    review:any
    processtime:any
    processbg:any
    processRequest(r:any){
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
        this.processbg = res;
        console.log(this.processbg);
        alert("request processed");
        location.reload();
        // this.processtime = this.processbg.track[0].processdate;
        // console.log(this.processtime);

      })
    }

    acceptRequest(r:any){   
   
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true,
          "process":true,
          "accept":true,
          "deliver":false           
        }]
      }).subscribe(res=>{
        console.log(res);
        alert("request accepted");
        location.reload();
      })
    }

    deliverRequest(r:any){       
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true,
          "process":true,
          "accept":true,
          "deliver":true          
        }]
      }).subscribe(res=>{
        console.log(res);
        // const deliver = document.getElementById("deliver");
        alert("request delivered");
        location.reload();
      })
    }

    deleterequest(r:any){
      console.log("test")
      this.http.delete(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`).subscribe(res=>{
        console.log(res);
        alert("request deleted");
        location.reload();
      })
    }

    editproduct(p:any){
      console.log(p);

    }

    deleteproduct(p:any){
      console.log(p);
      this.http.delete(`${Urls.PRODUCT}/${p.id}?access_token=${this.cuser.id}`).subscribe(res=>{
        console.log(res);
        alert("product deleted");
        location.reload();
      })
    }
    productinfo:any
    productstock:any
    productlocation:any
    pid:any
    openpopup(p:any){
      console.log(p)
      this.pid= p.id;
      this.productinfo =p.name;
      this.productlocation = p.location;
      this.productstock =p.quantity;
      console.log("open")
      var pop = document.getElementById("popupForm");
      if(pop){
        pop.style.display = 'block';
      }
    }

    save_modified_form(){
      console.log("save");
      this.http.patch(`${Urls.PRODUCT}/${this.pid}?access_token=${this.cuser.id}`,{
        "name" : this.editform.value.pname,
        "quantity" : this.editform.value.pstock,
        "location" : this.editform.value.ploc
      }).subscribe(res=>{
        console.log(res);
        location.reload();
      });
      var pop = document.getElementById("popupForm");
      if(pop){
        pop.style.display = 'none';
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

    getrcolor(){      
      var color= '#838383';
      if(this.request == true){
        color= '#417D7A';
      }
      return color;
    }

    opendeletepopup(){
      const open = document.getElementById("id01");
      open.style.display = 'block';
    }

    cancelbtn(){
      const open = document.getElementById("id01");
      open.style.display = 'none';
    }
}


