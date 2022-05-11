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

const routes: Routes = [
  {path:'',  redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent },
  {path:'inventory', component:InventoryComponent},
  {path:'users', component:UsersComponent},
  {path:'messages', component:MessagesComponent},
  {path:'reports', component:ReportsComponent},
  {path:'about', component:AboutComponent},
  {path:'profile', component:ProfileComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
