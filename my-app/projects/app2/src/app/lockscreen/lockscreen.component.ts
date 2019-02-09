import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from '../../../../../../my-app/src/app/services/register.service';
import { AuthService } from './../auth.service';
import { LoginService } from '../../../../../../my-app/src/app/services/login.service';
import {  UsersModel } from '../../../../../../my-app/src/app/models/users-model';
import { DashboardService} from './../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockScreenComponent implements OnInit {

  fullName:string;
  image:any;

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

  profileData:any;

  constructor(private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private registerService: RegisterService,
     public dashboardService:  DashboardService,
     private authService: AuthService,
     private loginService:LoginService,
     private toastr: ToastrService) 
     {
      if(!localStorage.getItem("accname"))
      {
        window.location.href = "http://localhost:49324/Home/Index";
      }

      document.body.style.backgroundColor = "#1fb5ac";
      this.image = localStorage.getItem("userimage");
      this.fullName = localStorage.getItem("accname");
      this.userModel.accountNumber = localStorage.getItem("accnum");
      this.userModel.userName = localStorage.getItem("username");

      if(!localStorage.getItem("accnum"))
      {
        this.authService.logout();
      }
      
     }

     ngOnInit()
     {
       
     }
   
    ngAfterViewInit() {
     
    }


    onLogout(){
      this.authService.logout();
    }

  login() {
      this.loginService.login(this.userModel)
      .then((response: UsersModel) => {
        if(response != null){
        localStorage.setItem("accnum", response["accountnumber"]);
        let fullname = response["firstname"] + " "+ response["lastname"];
        localStorage.setItem("accname",fullname);
        localStorage.setItem("isactive", "true");
        localStorage.setItem("username", response["username"]);
        document.body.style.backgroundColor = "white";
        window.location.href = "http://localhost:4400/membersection/view/dashboard";
      }
      else{
        this.toastr.error("Wrong username and password");
      }
    });
  }
    
}
