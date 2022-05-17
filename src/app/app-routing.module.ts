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
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',  redirectTo: '/login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'inventory', component:InventoryComponent,canActivate: [AuthGuard]},
  {path:'users', component:UsersComponent,canActivate: [AuthGuard]},
  {path:'messages', component:MessagesComponent,canActivate: [AuthGuard]},
  {path:'reports', component:ReportsComponent,canActivate: [AuthGuard]},
  {path:'about', component:AboutComponent,canActivate: [AuthGuard]},
  {path:'profile', component:ProfileComponent,canActivate: [AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent} ,
  {path:'menu',component:MenuComponent,canActivate: [AuthGuard]},
  {path:'landing',component:LandingPageComponent,canActivate: [AuthGuard]} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
