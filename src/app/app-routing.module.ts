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
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',  redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path:'inventory', component:InventoryComponent},
  {path:'users', component:UsersComponent},
  {path:'messages', component:MessagesComponent},
  {path:'reports', component:ReportsComponent},
  {path:'about', component:AboutComponent},
  {path:'profile', component:ProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent} ,
  {path:'menu',component:MenuComponent},
  {path:'landing',component:LandingPageComponent},
  {path:'add-product',component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
