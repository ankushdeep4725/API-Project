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
import { HighchartsChartModule } from 'highcharts-angular';

import { AppComponent } from './app.component';
import { App2RoutingModule } from './app2-routing.module';


import { HttpClientInterceptor } from '../../../../../my-app/src/app/services/http-interceptor';
import { BaseHttpService } from '../../../../../my-app/src/app/services/base-http-service';

import { AuthService } from './auth.service';
import { RegisterService } from '../../../../../my-app/src/app/services/register.service';
import { LoginService } from '../../../../../my-app/src/app/services/login.service';
import { AdminLoginService } from '../../../../../my-app/src/app/services/adminlogin.service';
import { DataService } from '../../../../../my-app/src/app/services/data.service';
import { DashboardService } from './dashboard.service';
import { PasswordService } from '../../../../../my-app/src/app/services/password.service';
import { BeneficiaryService } from '../../../../../my-app/src/app/services/beneficiary.service';
import { TransactionsService } from '../../../../../my-app/src/app/services/transactions.service';
import { CheckBookService } from '../../../../../my-app/src/app/services/checkbook.service';
import { BankServicesService } from '../../../../../my-app/src/app/services/bankservices.service';

import { MemberSectionComponent } from './membersection/membersection.component';
import { DashboardComponent } from './membersection/dashboard/dashboard.component';
import { UserProfileComponent } from './membersection/userprofile/userprofile.component';
import { EditProfileComponent } from './membersection/editprofile/editprofile.component';
import { AddBeneficiaryComponent } from './membersection/addbeneficiary/addbeneficiary.component';
import { BankStatementsComponent } from './membersection/bankstatements/bankstatements.component';
import { ChangePasswordsComponent } from './membersection/changepwd/changepwd.component';
import { ViewBeneficiaryComponent } from './membersection/viewbeneficiary/viewbeneficiary.component';
import { FundTransferToBeneficiaryComponent } from './membersection/fundtransfertobeneficiary/fundtransfertobeneficiary.component';
import { FundTransferToOtherComponent } from './membersection/fundtransfertoother/fundtransfertoother.component';
import { FundTransferToOwnComponent } from './membersection/fundtransfertoown/fundtransfertoown.component';
import { CheckBookComponent } from './membersection/checkbook/checkbook.component';
import { BankServicesComponent } from './membersection/bankservices/bankservices.component';
import { InterestCalcComponent } from './membersection/interestcalc/interestcalc.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';
import { AuthGuard } from './auth.guard';


const provider = [AuthGuard, AuthService, HttpClientInterceptor,BaseHttpService, DatePipe, 
  RegisterService, LoginService, AdminLoginService,
DataService, DashboardService, PasswordService, BeneficiaryService, TransactionsService,
CheckBookService, BankServicesService];

@NgModule({
  declarations: [
    AppComponent,
    MemberSectionComponent,
    DashboardComponent,
    UserProfileComponent,
    EditProfileComponent,
    AddBeneficiaryComponent,
    BankStatementsComponent,
    
    ChangePasswordsComponent,
    ViewBeneficiaryComponent,
    FundTransferToBeneficiaryComponent,
    FundTransferToOtherComponent,
    FundTransferToOwnComponent,
    CheckBookComponent,
    BankServicesComponent,
    InterestCalcComponent,
    LockScreenComponent
  ],
  imports: [
    BrowserModule,
    App2RoutingModule,

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
    HighchartsChartModule
  ],
  providers: provider,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class App2SharedModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: provider
    }
  }
}