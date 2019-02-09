import { Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from '../../../../../../my-app/src/app/services/register.service';
import { TransactionsService } from '../../../../../../my-app/src/app/services/transactions.service';
import { DashboardService } from '../../../../app2/src/app/dashboard.service';
import {  UsersModel } from '../../../../../../my-app/src/app/models/users-model';
import {  TransactionsModel } from '../../../../../../my-app/src/app/models/transactions-model'; 
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  city:string;
  filter = false;
  responsemessage = "";
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
    gender: "Male",
    dateOfBirth: "",
    accountbalance:"",
    randomText:""
  };


  transactionsModel: TransactionsModel = {
    id:0,
    name: "",
    nickName:"",
    senderAccountNumber:"",
    receiverAccountNumber:"",
    ifsccode:"",
    transactionDate: "",
    creditAmount:"0",
    debitAmount:""
  }


  constructor(private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder, 
    private registerService: RegisterService, private dashboardService : DashboardService,
   private transactionsService: TransactionsService, private toastr: ToastrService ) 
  {}

  ngOnInit() 
  {}

  onFilterChange(event)
  {
    this.filter = !this.filter;

    console.log(this.filter);
  }

  newRegistration() 
  {
      this.blockUI.start('Loading...');
      if(this.userModel.password !== this.userModel.newPassword){
        this.toastr.error("Mismatch Password and Retype Password");
        this.blockUI.stop();
        //this.responsemessage = "";
        return;
      }
      this.userModel.location  = this.userModel.location + " " + this.city;
      this.userModel.holderName = this.userModel.firstName + this.userModel.lastName;
      this.userModel.accountNumber = this.getrandomAccountNumber().toString();
      this.registerService.registerProfile(this.userModel)
      .then((response: any) => {
        this.blockUI.stop();
          if(response === "email"){
            this.toastr.error("Email Already Exists"); 
          }
          else if(response === "username"){
            this.toastr.error("Username Already Exists");
          }
          else{
            this.transactionsModel.senderAccountNumber = this.userModel.accountNumber;
            this.transactionsModel.creditAmount = "100000";
            this.transactionsService.addFirstTransactions(this.transactionsModel)
            .then((response: any) => {
              if(response !== "Error"){
                this.toastr.success("Registered Successfully");     
              }
            }, (error: any) => {
              console.log("I am here");
             this.blockUI.stop();
             });
        
          }
      }, (error: any) => {
        console.log("I am here");
       this.blockUI.stop();
       });
  
  }

    getrandomAccountNumber()
    {
        return Math.floor(Math.random()*(999999999999-111111111111+1)+111111111111);
    }

}
