import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import { UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import { CheckBookService } from '../../../../../../../my-app/src/app/services/checkbook.service';
import { CheckbookModel } from '../../../../../../../my-app/src/app/models/checkbook-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkbook',
  templateUrl: './checkbook.component.html',
  styleUrls: ['./checkbook.component.css']
})
export class CheckBookComponent implements OnInit {

  currentAccountNumber: any;
  profileData: any;
  responsemessage = "";
  checkbookModel: CheckbookModel = {
    id:0,
    usersAccountNumber:"",
    issueDate:"",
    deliveredDate: "",
    isDelivered: "",
    numberOfPages:"10"
  }
  

  constructor(private dashboardService: DashboardService,
              private checkBookService: CheckBookService, private toastr: ToastrService) { 
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

  applyCheckbook()
  {
   this.checkbookModel.usersAccountNumber = this.currentAccountNumber;
   
   this.checkBookService.issueCheckBook(this.checkbookModel).
   then((response: CheckbookModel) => {
    if(response !== null)
    {
      this.toastr.success("Your request for issue checkbook is applied. You get checkbook 7 days after applied.");
    }
  });
  }

}
