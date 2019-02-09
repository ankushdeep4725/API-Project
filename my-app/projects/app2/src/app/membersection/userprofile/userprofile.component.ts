import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';


@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileData: any;
  currentAccountNumber:any;
  message:string;


  constructor(private dashboardService: DashboardService) {
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
      this.dashboardService.currentUserImage =  'data:image/png;base64,'+ response.image;
      this.profileData.image = 'data:image/png;base64,'+ response.image;
      localStorage.setItem("userimage",  'data:image/png;base64,'+ response["image"]);
      console.log(this.profileData);
      this.dashboardService.onMainEvent.emit(this.profileData);
   });
  }

}