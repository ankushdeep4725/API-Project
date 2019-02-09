import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import { BankServicesService } from '../../../../../../../my-app/src/app/services/bankservices.service';
import { BankServicesModel   } from '../../../../../../../my-app/src/app/models/bankservices-model';
import { BeneficiaryService } from '../../../../../../../my-app/src/app/services/beneficiary.service';
import { TransactionsService } from '../../../../../../../my-app/src/app/services/transactions.service';
import { TransactionsModel   } from '../../../../../../../my-app/src/app/models/transactions-model';
import { BeneficiaryModel   } from '../../../../../../../my-app/src/app/models/beneficiary-model';
import { PasswordService } from '../../../../../../../my-app/src/app/services/password.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fundtransfertoown',
  templateUrl: './fundtransfertoown.component.html',
  styleUrls: ['./fundtransfertoown.component.css']
})
export class FundTransferToOwnComponent implements OnInit {

  currentAccountNumber: any;
  profileData: any;
  beneficiaryData: any[];
  responsemessage = "";
  selectedBeneficiary: any = "";
  transactionpaswd: string;
  confirmAccountNumber: any;
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
    .then((response: any) => {
      this.profileData = response;
      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
   });
  }


  fundsTransfer()
  {

    if(this.confirmAccountNumber !== this.transactionsModel.receiverAccountNumber)
    {
      this.toastr.error("Mismatch receiver account and confirm account number.");
      return;
    }
    else
    {
      this.transactionsService.checkAccountExists(this.transactionsModel.receiverAccountNumber)
      .then((result :any) =>{
        if(result > 0){
          this.passwordService.checkTransactionPassword(this.currentAccountNumber, this.transactionpaswd)
          .then((res:string) => {
            if(res === "Error"){
              this.toastr.error("Wrong transaction password.");
            }
            else
            {
              this.transactionsModel.senderAccountNumber = this.currentAccountNumber;
    
              console.log(this.transactionsModel);
            this.transactionsService.addTransactionsForSameBank(this.transactionsModel)
              .then((response: any) => {
                if(response != null)
                {
                  this.toastr.success("Funds Successfully transferred");
                  this.clearControls();
                }
              });
            }
         });
        }
        else{
          this.toastr.error("Entered account number is not registered in the same bank.");
        }
      });
     
  }

  }


  onCancel()
  {
    this.clearControls();
  }

  clearControls()
  {
    this.transactionpaswd = "";
    this.confirmAccountNumber = "";
    this.transactionsModel = {
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
  }
}
