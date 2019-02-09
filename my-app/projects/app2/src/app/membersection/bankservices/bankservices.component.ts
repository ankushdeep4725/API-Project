import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import { BankServicesService } from '../../../../../../../my-app/src/app/services/bankservices.service';
import {BankServicesModel   } from '../../../../../../../my-app/src/app/models/bankservices-model';
import { TransactionsService } from '../../../../../../../my-app/src/app/services/transactions.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bankservices',
  templateUrl: './bankservices.component.html',
  styleUrls: ['./bankservices.component.css']
})
export class BankServicesComponent implements OnInit {

  currentAccountNumber: any;
  profileData: any;
  responsemessage = "";
  bankServicesList = [{Key:"SMS",Value:"SMS Services"},
                      {Key:"InternetBanking",Value:"Internet Banking Services"} ,
                      {Key:"MobileBanking",Value:"Mobile Banking Services"}, 
                      {Key:"EmailStatement",Value:"For Bank Statement"}]

  services : any;
  selectedServices = [];
  appliedServices = [];
  bankServicesModel: BankServicesModel = {
    id:0,
    usersAccountNumber:"",
    services: ""
  }
  

  constructor(private dashboardService: DashboardService,
              private bankServicesService: BankServicesService,
              private transactionsService: TransactionsService,
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
      this.profileData.image = 'data:image/png;base64,'+ response.image;
      this.dashboardService.onMainEvent.emit(this.profileData);      


      this.bankServicesService.viewAppliedBankService(this.currentAccountNumber)
      .then((res: BankServicesModel[]) =>{
        if(res.length > 0 ){
          this.appliedServices = res[0].services.split(",");
          this.appliedServices.forEach((item) =>{
            var element = <HTMLInputElement> document.getElementById(item);
            element.checked = true;
            this.selectedServices.push(item);
          });
        }
        else{
          console.log("no service selected");
        }
        
        //var isChecked = element.checked;
        //this.bankServicesList[0].Checked = true;
      });

   });

   

  }

  onCheckboxChange(event, key)
  {
    if(event)
    {
      this.selectedServices.push(key)
    }
    else
    {
      this.selectedServices = this.selectedServices.filter(x=> x != key);
    }
  }

  applyServices()
  {
    
    this.bankServicesModel.services = this.selectedServices.toString();
    this.bankServicesModel.usersAccountNumber = this.currentAccountNumber;
    this.bankServicesService.applyBankServices(this.bankServicesModel).
    then((response: BankServicesModel) => {
      if(response !== null)
      {

        this.toastr.success("Your selected service will be working within next 24 hours");

        this.selectedServices.forEach((item) =>{
          console.log(item);

          let a = this.appliedServices.indexOf(item);
          console.log(a);

          if(this.appliedServices.indexOf(item) == -1 ){
              if(item == "SMS")
              {
                this.transactionsService.addTransactionsForBankServices(
                  this.currentAccountNumber,item, "75").
                  then((response: any) => {

                  });
              }
              if(item == "InternetBanking")
              {
                this.transactionsService.addTransactionsForBankServices(
                  this.currentAccountNumber,item, "100").
                  then((response: any) => {
                    
                  });
              }
              if(item == "MobileBanking")
              {
                this.transactionsService.addTransactionsForBankServices(
                  this.currentAccountNumber,item, "150").
                  then((response: any) => {
                    
                  });
              }
              if(item == "EmailStatement")
              {
                this.transactionsService.addTransactionsForBankServices(
                  this.currentAccountNumber,item, "50").
                  then((response: any) => {
                    
                  });
              }
          }
          else{
            console.log("already " + item);
          }
        })
      }
    });
  }

}
