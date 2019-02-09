import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../../../../../../my-app/src/app/services/transactions.service';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';


@Component({
  selector: 'app-bankstatements',
  templateUrl: './bankstatements.component.html',
  styleUrls: ['./bankstatements.component.css']
})
export class BankStatementsComponent implements OnInit {

  profileData: any;
  startDate:any= "";
  endDate:any = "";
  transactionList:any;
  currentAccountNumber: any;
  bankstatment : any = [];

  constructor(private transactionsService: TransactionsService, 
    private dashboardService: DashboardService) {

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
      this.profileData.image = 'data:image/png;base64,'+ response.image;
      this.dashboardService.onMainEvent.emit(this.profileData);      
      this.showStatement();
   });
  }

  resetDates()
  {
    this.startDate = ""; 
    this.endDate = "";
  }

  showStatement()
  {
    this.bankstatment = [];
    
    if(this.startDate === "" || this.endDate === "")
    {
      this.transactionsService.getFinalLastTenTransactions(this.currentAccountNumber)
      .then((response: any) => {
        this.transactionList = response; 
        console.log(this.transactionList); 
        this.transactionList.forEach(transaction => {
          let accNumber = "";
          let credit = "";
          let debit = "";

          if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == null)
          {
          }
          if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == this.currentAccountNumber)
          {
            this.bankstatment.push({accountNumber: transaction.name + " Charges", 
              credit:"0" , debit: transaction.debitamount, 
              transactiondate: transaction.transactiondate}); 
          }
          else if(this.currentAccountNumber == transaction.senderaccountnumber)
          {
            this.bankstatment.push({accountNumber: transaction.receiveraccountnumber, 
              credit:"0" , debit: transaction.debitamount, 
              transactiondate: transaction.transactiondate});
          }
          else
          {
            this.bankstatment.push({accountNumber: transaction.senderaccountnumber, 
              debit:"0" , credit: transaction.debitamount, 
              transactiondate: transaction.transactiondate});
          }
        })
      });
    }
    else
    {
      console.log(this.startDate);
      console.log(this.endDate);
      this.transactionsService.getTransactions(this.currentAccountNumber,this.startDate,this.endDate)
      .then((response: any) => {
        this.transactionList = response; 
        console.log(this.transactionList); 
        this.transactionList.forEach(transaction => {
          let accNumber = "";
          let credit = "";
          let debit = "";

          if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == null)
          {
          }
          if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == this.currentAccountNumber)
          {
            this.bankstatment.push({accountNumber: transaction.name + "Charges", 
              credit:"0" , debit: transaction.debitamount, 
              transactiondate: transaction.transactiondate}); 
          }
          else if(this.currentAccountNumber == transaction.senderaccountnumber)
          {
            this.bankstatment.push({accountNumber: transaction.receiveraccountnumber, 
              credit:"0" , debit: transaction.debitamount, 
              transactiondate: transaction.transactiondate});
          }
          else
          {
            this.bankstatment.push({accountNumber: transaction.senderaccountnumber, 
              debit:"0" , credit: transaction.debitamount, 
              transactiondate: transaction.transactiondate});
          }
        })
      });
    }
  }

}
