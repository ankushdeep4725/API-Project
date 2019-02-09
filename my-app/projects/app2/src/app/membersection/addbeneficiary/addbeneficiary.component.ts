import { Component, OnInit } from '@angular/core';
import { BeneficiaryService } from '../../../../../../../my-app/src/app/services/beneficiary.service';
import { BeneficiaryModel } from '../../../../../../../my-app/src/app/models/beneficiary-model';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-addbeneficiary',
  templateUrl: './addbeneficiary.component.html',
  styleUrls: ['./addbeneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {

  currentAccountNumber: any;
  profileData:any;
  beneficiaryModel : BeneficiaryModel = {
    id: 0,
    name: "",
    nickName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsccode: "",
    maxAmount: "",
    maxTransactions: "",
    address: "",
    usersAccountNumber: ""
  }

  responsemessage:any;

  constructor(private beneficiaryService: BeneficiaryService, 
    private toastr: ToastrService, private dashboardService: DashboardService) {

      if(!localStorage.getItem("accname"))
      {
        window.location.href = "http://localhost:49324/Home/Index";
        return;
      }

     }

  ngOnInit() 
  {
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
   });
  }

  saveBeneficiary()
  {
    this.beneficiaryModel.usersAccountNumber = this.currentAccountNumber;
    
    if(this.beneficiaryModel.accountNumber !== this.beneficiaryModel.confirmAccountNumber)
    {
      this.toastr.error("Mismatch beneficiary account number and confirm account number");
      return;
    }

    this.beneficiaryService.addBeneficiary(this.beneficiaryModel)
    .then((response: any) => {
      if(response != null)
      {
        this.toastr.success("Beneficiary Added Successfully");
        this.clearControls();
      }
     });
  }

  onCancel()
  {
   this.clearControls(); 
  }

  clearControls()
  {
    this.beneficiaryModel = {
      id: 0,
      name: "",
      nickName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      ifsccode: "",
      maxAmount: "",
      maxTransactions: "",
      address: "",
      usersAccountNumber: ""
    }
  }

}
