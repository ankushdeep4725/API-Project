import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';

@Component({
  selector: 'app-interestcalc',
  templateUrl: './interestcalc.component.html',
  styleUrls: ['./interestcalc.component.css']
})
export class InterestCalcComponent implements OnInit {

  currentAccountNumber: any;
  profileData: any;
  responsemessage : any;
  selectedOption: any = "";
  options = [
            { name: "3 Months", value: 3 , interest: 5 },
            { name: "6 Months", value: 6 , interest: 10 },
            { name: "9 Months", value:9 , interest: 15 },
            { name: "1 Year", value: 12 , interest: 20 }
          ];

  constructor(private dashboardService: DashboardService) {
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

  calculateIntrest()
  {
    if(this.selectedOption){
      console.log(this.profileData.accountbalance);
      console.log(this.selectedOption.interest);
      console.log(this.selectedOption.value);
      let val1 = Math.round((parseFloat(this.profileData.accountbalance) * (1 + (parseInt(this.selectedOption.interest)/100) * (parseInt(this.selectedOption.value) *0.083333))) * 100) / 100
      let value = val1.toString(); 
      let intrate = this.selectedOption.interest
      this.responsemessage = {key: val1, val:intrate};
    }
    else{
      console.log("ERE");
    }
   
  }

}
