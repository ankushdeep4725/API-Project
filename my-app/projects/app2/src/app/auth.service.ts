
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
@Injectable()
export class AuthService {
  constructor(private myRoute: Router,private dashboardService: DashboardService) { }
  
  isLoggednIn() {
    if(localStorage.getItem("accnum") !== null && 
     localStorage.getItem("accname") !== null &&
     localStorage.getItem("username") !== null &&
     localStorage.getItem("isactive") == "true")
    {

        console.log(localStorage.getItem("accnum"));
        console.log(localStorage.getItem("accname"));
        console.log(localStorage.getItem("username"));
        console.log(localStorage.getItem("isactive")); 
        return true;
    }
    else{
        return false;
    }
  }
  
  logout() {
    
    this.dashboardService.destroyRamdonText(localStorage.getItem("accnum"))
    .then((response: any) => {
      localStorage.removeItem("accnum");
      localStorage.removeItem("isactive")
      localStorage.removeItem("accname");
      localStorage.removeItem("username");
      window.location.href = "http://localhost:49324/Home/Index";
    });
  }


  simpleLogout() {
      window.location.href = "http://localhost:49324/Home/Index";
  }
  
}
