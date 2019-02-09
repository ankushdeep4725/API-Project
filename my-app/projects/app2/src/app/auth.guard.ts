
import { Injectable } from '@angular/core';
import { AuthService} from './auth.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}


  canActivate(){
    if (!this.auth.isLoggednIn()) {
        window.location.href = "http://localhost:49324/Home/Index";
        return false;
      }
      
  }
}