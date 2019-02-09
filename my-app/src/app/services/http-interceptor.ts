import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('access_token');
    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    return next.handle(req)
      .do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          //console.log('processing response', ev);
        }
      }).catch(response => {
        if (response instanceof HttpErrorResponse) {
          this.handleError(response);
          //console.log('Processing http error', response);
        }
        return Observable.throw(response);
      });
  }

  private handleError(error: HttpErrorResponse | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    const err = error || JSON.stringify(error);
    errMsg = err.error.Message;
    //this.snack.open(errMsg, '', { duration: 4000 })
    return Observable.throw(errMsg);
  }

  private isUnauthorized(status: number): boolean {
    return status === 401;
  }
}
