
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// @Injectable()
// export class AuthService {
//   constructor(private myRoute: Router) { }
  
//   isLoggednIn() {
//     if(localStorage.getItem("accnum") !== null && 
//      localStorage.getItem("accname") !== null &&
//      localStorage.getItem("username") !== null &&
//      localStorage.getItem("isactive") == "true")
//     {

//         console.log(localStorage.getItem("accnum"));
//         console.log(localStorage.getItem("accname"));
//         console.log(localStorage.getItem("username"));
//         console.log(localStorage.getItem("isactive")); 
//         return true;
//     }
//     else{
//         return false;
//     }
//   }
  
//   logout() {
//     localStorage.removeItem("accnum");
//     localStorage.removeItem("isactive")
//     localStorage.removeItem("accname");
//     localStorage.removeItem("username");

//     console.log(localStorage.getItem("accnum"));
//     console.log(localStorage.getItem("accname"));
//     console.log(localStorage.getItem("username"));
//     console.log(localStorage.getItem("isactive")); 

//     this.myRoute.navigate(["/login"]);
//   }
// }
