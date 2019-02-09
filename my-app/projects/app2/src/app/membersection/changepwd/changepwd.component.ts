import { Component, OnInit } from '@angular/core';
import { PasswordService } from '../../../../../../../my-app/src/app/services/password.service';
import { DashboardService } from '../../dashboard.service';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangePasswordsComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  changePassword = {
    oldPassword : "",
    newPassword : "",
    confirmNewPassword : ""
  };

  changeTransactionPassword = {
    oldPassword : "",
    newPassword : "",
    confirmNewPassword : ""
  };

  profileData:any;

  userModel: UsersModel  = {
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    newPassword: "",
    transactionPassword: "",
    newTransactionPassword: "",
    holderName: "",
    accountNumber: "",
    cretedOn: "",
    contactNumber: "",
    email: "",
    lastLogin: "",
    location: "",
    gender: "",
    dateOfBirth: "",
    accountbalance: "",
    randomText:""
  };

  currentAccountNumber: any;
  responsemessage : any;
  responsetransactionmessage: any;

  constructor(private dashboardService: DashboardService, 
    private passwordService: PasswordService, private toastr: ToastrService) { 
      if(!localStorage.getItem("accname"))
      {
        window.location.href = "http://localhost:49324/Home/Index";
        return;
      }

    }

  ngOnInit() {
    this.currentAccountNumber = localStorage.getItem("accnum");
    this.getProfile();
  }


  getProfile()
  {
    this.blockUI.start("Loading....");
    this.dashboardService.getProfile(this.currentAccountNumber)
    .then((response: any) => {
      this.profileData = response;
      console.log(this.profileData);
      this.dashboardService.currentUserImage = 'data:image/png;base64,'+ response.image;
      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
      this.blockUI.stop();
   });
  }

  updatePassword()
  {
    this.userModel.accountNumber = this.currentAccountNumber;
    this.userModel.password = this.changePassword.oldPassword;
    this.userModel.newPassword = this.changePassword.newPassword;
    if(this.changePassword.newPassword !== this.changePassword.confirmNewPassword)
    {
      this.toastr.error("New Password and Confirm new Password Mismatch");
      return;
    }

    this.passwordService.changePassword(this.userModel)
    .then((response: any) => {
      if(response !=null)
      {
        this.toastr.success("Password Changed Successfully");
      }
      else
      {
        this.toastr.error("Old password does not match");
      }
     });
  }

  onPasswordCancel()
  {
    this.changePassword.oldPassword = "";
    this.changePassword.newPassword = "";
    this.changePassword.confirmNewPassword = "";
  }

  onTransactionPasswordCancel()
  {
    this.changeTransactionPassword.oldPassword = "";
    this.changeTransactionPassword.newPassword = "";
    this.changeTransactionPassword.confirmNewPassword = "";
  }

  updateTransactionPassword()
  {
    this.userModel.accountNumber = this.currentAccountNumber;
    this.userModel.transactionPassword = this.changeTransactionPassword.oldPassword;
    this.userModel.newTransactionPassword = this.changeTransactionPassword.newPassword;

    if(this.changeTransactionPassword.newPassword !== this.changeTransactionPassword.confirmNewPassword)
    {
      this.toastr.error("New Transaction Password and Confirm new Transaction Password Mismatch");
      return;
    }
    this.passwordService.changeTransactionPassword(this.userModel)
    .then((response: any) => {
      console.log(response);  
      if(response !=null)
      {
        this.toastr.success("Transaction Password Changed");
      }
      else
      {
        this.toastr.error("Old transactions password does not match");
      }
     });
  }


}
