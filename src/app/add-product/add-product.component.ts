import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import {HttpClient} from '@angular/common/http';
import { Urls } from '../constants/urls';

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
  request = false;
  userlist: any;
  item: any;
  formDataToUpload: any
    imagePick: any;
  generatedImage: any;
  finalimageFile: any;
  generateName: any
  term: string;

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
      this.user = false;
      this.request = false;
    }
    userslist:any
    userListName:any
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
      this.tempData(this.item);
        })
      this.dashboard = false;
      this.user = false;
      this.request = true;
      
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
    temp:any[] = []
    tempData(d:any){
      for(var i=0;i<d.length;i++){
        var trackinfo = {
          "name": '',
          "product": '',
          "review": false,
          "process": false,
          "accept": false,
          "deliver": false          
        }
        trackinfo.name = d[i].employeename;
        trackinfo.product = d[i].name;
        this.temp = this.temp.concat(trackinfo);
        console.log(d[i]);
      }
      console.log(this.temp);      
    }

    processRequest(r:any){
      console.log("rqid",r.id);
      console.log("temp",this.temp);
      this.http.patch(`${Urls.RITEM}/${r.id}?access_token=${this.cuser.id}`,{
        "track":[{
          "review":true,
          "process":false,
          "accept":false,
          "deliver":false
        }]
      }).subscribe(res=>{
        console.log(res);
      })
      
    }
}


