import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../dashboard.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import {  UsersModel } from '../../../../../../../my-app/src/app/models/users-model';
import {Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentAccountNumber: any;
  profileData: any;
  fileToUpload: File = null;
  imagePath: string;
  responsemessage = "";

  constructor(private dashboardService: DashboardService, private router: Router,
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
      console.log(this.profileData);
   });
  }

  updateProfile()
  {

    console.log(this.profileData);
    this.dashboardService.updateProfile(this.profileData)
    .then((response: UsersModel) => {
      if(response !== null){
        this.router.navigate(['membersection/view/userprofile']);
      }
      else{
        this.toastr.error("Error while updating the record.");
      }
   });
  }

  onCancel()
  {
    this.router.navigate(['userprofile']);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    this.dashboardService.updateImage(this.fileToUpload, this.currentAccountNumber)
      .then((response: any) => {
        // if(!response)
        // {
        //   this.toastr.error("Error while uploading image");
        // }
        console.log(response);
       //this.imagePath = 'data:image/png;base64,'+ response;
        //console.log(response);
        console.log("File Uploaded");
      });
  }

  updatedateOfBirth(event)
  {
    this.profileData.dateOfBirth = event;
  }

}
