import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseHttpService } from './base-http-service';

@Injectable()
export class AdminLoginService {

	//baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	// signIn(loginModel: LoginModel): Promise<LoginModel> {
	// 	return this.baseHttpService.Post(this.baseUrl +  '/login/adminLogin', loginModel)
    //         .then(function (response) {
    //             return response as LoginModel;
    //         });
	// }
}
