import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { BeneficiaryService } from '../../../../../../../my-app/src/app/services/beneficiary.service';

@Component({
  selector: 'app-viewbeneficiary',
  templateUrl: './viewbeneficiary.component.html',
  styleUrls: ['./viewbeneficiary.component.css']
})
export class ViewBeneficiaryComponent implements OnInit {

  currentAccountNumber:any;
  profileData: any;
  beneficiaryData: any[];

  constructor(private dashboardService: DashboardService, 
    private beneficiaryService: BeneficiaryService ) { 
      if(!localStorage.getItem("accname"))
      {
        window.location.href = "http://localhost:49324/Home/Index";
        return;
      }

    }

  ngOnInit() {
    this.currentAccountNumber = localStorage.getItem("accnum");
    this.getProfile(); 
    this.viewBeneficiary();

  }

  getProfile()
  {
    this.dashboardService.getProfile(this.currentAccountNumber)
    .then((response: any) => {
      this.profileData = response;
      //localStorage.setItem("userimage",  'data:image/png;base64,'+ response["image"]);
      // localStorage.setItem("accnum", response["accountnumber"]);
      // let fullname = response["firstname"] + " "+ response["lastname"];
      // localStorage.setItem("accname",fullname);
      // localStorage.setItem("isactive", "true");
      // localStorage.setItem("username", response["username"]);

      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
   });
  }

  viewBeneficiary()
  {
    this.beneficiaryService.viewBeneficiary(this.currentAccountNumber)
    .then((response: any) => {
      this.beneficiaryData = response;
   });
  }

}
