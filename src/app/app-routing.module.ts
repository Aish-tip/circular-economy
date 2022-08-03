import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { ReportsComponent } from './reports/reports.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { IndividualProductComponent } from './individual-product/individual-product.component';
import { AuthGuard } from './services/auth.guard';
import { NoauthGuard } from './services/noauth.guard';

const routes: Routes = [
  {path:'',  redirectTo: '/login', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'inventory', component:InventoryComponent, canActivate :[AuthGuard]},
  {path:'account', component:UsersComponent, canActivate :[AuthGuard]},
  {path:'messages', component:MessagesComponent, canActivate :[AuthGuard]},
  {path:'reports', component:ReportsComponent, canActivate :[AuthGuard]},
  {path:'about', component:AboutComponent},
  {path:'profile', component:ProfileComponent, canActivate :[AuthGuard]},
  {path:'login', component:LoginComponent, canActivate : [NoauthGuard] },
  {path:'track', component:TrackingComponent, canActivate:[AuthGuard]},
  {path:'menu',component:MenuComponent},
  {path:'landing',component:LandingPageComponent, canActivate :[AuthGuard]},
  {path:'add-product',component:AddProductComponent, canActivate :[AuthGuard]},
  {path:'manage-product',component:ManageProductComponent, canActivate: [AuthGuard]},
  {path:'product-request',component:ProductRequestComponent, canActivate: [AuthGuard]},
  {path:'manage-user', component:ManageUserComponent, canActivate: [AuthGuard]},
  {path:'product-description/:id', component:IndividualProductComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
