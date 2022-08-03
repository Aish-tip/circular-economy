import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { ReportsComponent } from './reports/reports.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { OpenSidebarOnswipeDirective } from './open-sidebar-onswipe.directive';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './services/auth.guard';
import { FooterComponent } from './footer/footer.component';
import { AddProductComponent } from './add-product/add-product.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductRequestComponent } from './product-request/product-request.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ContactComponent } from './contact/contact.component';
import { IndividualProductComponent } from './individual-product/individual-product.component';


//googleChartsConfigSubject.next(config);
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InventoryComponent,
    UsersComponent,
    MessagesComponent,
    ReportsComponent,
    AboutComponent,
    OpenSidebarOnswipeDirective,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    LandingPageComponent,
    FooterComponent,
    AddProductComponent,
    SearchbarComponent,
    TrackingComponent,
    ManageProductComponent,
    ProductRequestComponent,
    ManageUserComponent,
    ContactComponent,
    IndividualProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [authInterceptorProviders, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
