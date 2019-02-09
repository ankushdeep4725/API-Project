import { Component, OnInit, Input } from '@angular/core';
import { Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../../../../../../my-app/src/app/services/login.service';
import { DataService } from '../../../../../../my-app/src/app/services/data.service';
import { UsersModel } from '../../../../../../my-app/src/app/models/users-model';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  responsemessage = "";
  @BlockUI() blockUI: NgBlockUI;
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

  constructor(private router: Router , private formBuilder: FormBuilder, 
    private loginService:LoginService,
    private dataService:DataService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login()
  {
    this.blockUI.start('Loading...');

    this.userModel.randomText = this.generateRandomAlphaNumeric();
    console.log(this.userModel.randomText);
    this.loginService.login(this.userModel)
    .then((response: UsersModel) => {
      this.blockUI.stop();
      if(response != null){
       
        window.location.href = "http://localhost:4400/membersection/view/dashboard?v="+this.userModel.randomText;
      }
      else{
        this.toastr.error("Wrong username and password");

      }
    }, (error: any) => {
      console.log("I am here");
     this.blockUI.stop();
     });
  }


  generateRandomAlphaNumeric() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  

}
