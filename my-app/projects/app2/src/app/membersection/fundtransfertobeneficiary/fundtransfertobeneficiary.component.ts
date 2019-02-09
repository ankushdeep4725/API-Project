import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import { BankServicesService } from '../../../../../../../my-app/src/app/services/bankservices.service';
import { BankServicesModel   } from '../../../../../../../my-app/src/app/models/bankservices-model';
import { BeneficiaryService } from '../../../../../../../my-app/src/app/services/beneficiary.service';
import { PasswordService } from '../../../../../../../my-app/src/app/services/password.service';
import { TransactionsService } from '../../../../../../../my-app/src/app/services/transactions.service';
import { TransactionsModel   } from '../../../../../../../my-app/src/app/models/transactions-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fundtransfertobeneficiary',
  templateUrl: './fundtransfertobeneficiary.component.html',
  styleUrls: ['./fundtransfertobeneficiary.component.css']
})
export class FundTransferToBeneficiaryComponent implements OnInit {

  transactionpaswd: string;
  currentAccountNumber: any;
  profileData: any;
  beneficiaryData: any[];
  responsemessage = "";
  selectedBeneficiary: any = "";
  transactionsModel: TransactionsModel = {
    id:0,
    name: "",
    nickName:"",
    senderAccountNumber:"",
    receiverAccountNumber:"",
    ifsccode:"",
    transactionDate: "",
    creditAmount:"",
    debitAmount:""
  }
  

  constructor(private dashboardService: DashboardService,
              private bankServicesService: BankServicesService,
              private beneficiaryService: BeneficiaryService,
              private transactionsService: TransactionsService,
             private passwordService: PasswordService,
             private toastr: ToastrService) {
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
    this.dashboardService.getProfile(this.currentAccountNumber)
    .then((response: UsersModel) => {
      this.profileData = response;
      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
      this.viewBeneficiary();
   });
  }

  viewBeneficiary()
  {
    this.beneficiaryService.viewBeneficiary(this.currentAccountNumber)
    .then((response: any) => {
      this.beneficiaryData = response;
   });
  }


  fundsTransfer()
  {

    debugger;
    console.log(this.selectedBeneficiary);
    let beneficiary = this.beneficiaryData.filter(x=>x.accountnumber === this.selectedBeneficiary)[0];

    this.transactionsModel.name = beneficiary.name;
    this.transactionsModel.nickName = beneficiary.nickname
    this.transactionsModel.senderAccountNumber = this.currentAccountNumber;
    this.transactionsModel.receiverAccountNumber = this.selectedBeneficiary;
    this.transactionsModel.ifsccode = beneficiary.ifsccode
    this.transactionsModel.creditAmount = "0";
    

    this.passwordService.checkTransactionPassword(this.currentAccountNumber, this.transactionpaswd)
    .then((res:string) => {
      if(res === "Error"){
        this.toastr.error("Wrong transaction password.");
        
      }
      else
      {
        this.transactionsService.checkAccountExists(this.selectedBeneficiary)
        .then((response: any) => {
          if(response > 0)
          {
            this.transactionsService.addTransactionsForSameBank(this.transactionsModel)
              .then((response: any) => {
                if(response != null)
                {
                  this.toastr.success("Funds Successfully transfer to the selected beneficiary account");
                  this.clearControls();
                }
              });
          }
          else
          {

            this.transactionsService.addTransactionsForDifferentBank(this.transactionsModel)
              .then((response: any) => {
                if(response != null)
                {
                  this.toastr.success("Funds Successfully transfer to the selected beneficiary account");
                  this.clearControls();
                }
              });
          }
        });
      }
    });
    }


  onCancel()
  {
    this.clearControls();
  }

  clearControls()
  {
    this.transactionpaswd = "";
    this.transactionsModel = {
      id:0,
      name: "",
      nickName:"",
      senderAccountNumber:"",
      receiverAccountNumber:"",
      ifsccode:"",
      transactionDate: "",
      creditAmount:"",
      debitAmount:""
    }
  }

}
