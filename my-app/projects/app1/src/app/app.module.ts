import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment'; 
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; 
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';

import { AppComponent } from './app.component';

import { App1RoutingModule } from './app1-routing.module';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ServiceComponent } from './service/service.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

import { HttpClientInterceptor } from '../../../../../my-app/src/app/services/http-interceptor';
import { BaseHttpService } from '../../../../../my-app/src/app/services/base-http-service';

import { RegisterService } from '../../../../../my-app/src/app/services/register.service';
import { LoginService } from '../../../../../my-app/src/app/services/login.service';
import { AdminLoginService } from '../../../../../my-app/src/app/services/adminlogin.service';
import { DataService } from '../../../../../my-app/src/app/services/data.service';
import { DashboardService } from '../../../app2/src/app/dashboard.service';
import { PasswordService } from '../../../../../my-app/src/app/services/password.service';
import { BeneficiaryService } from '../../../../../my-app/src/app/services/beneficiary.service';
import { TransactionsService } from '../../../../../my-app/src/app/services/transactions.service';
import { CheckBookService } from '../../../../../my-app/src/app/services/checkbook.service';
import { BankServicesService } from '../../../../../my-app/src/app/services/bankservices.service';

import { NgbdCarouselBasic } from './carousel-basic';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const provider = [ HttpClientInterceptor,BaseHttpService, DatePipe, 
  RegisterService, LoginService, AdminLoginService,
DataService, DashboardService, PasswordService, BeneficiaryService, TransactionsService,
CheckBookService, BankServicesService];


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ServiceComponent,
    AboutComponent,
    ContactComponent,
    //NgbdCarouselBasic
  ],

  imports: [
    BrowserModule,
    App1RoutingModule,

    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    //NgbModule.forRoot()
  ],
  providers: provider,
  bootstrap: [AppComponent]
})
export class AppModule { }


@NgModule({})
export class App1SharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: provider
    }
  }
}