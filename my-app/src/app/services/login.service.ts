import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseHttpService } from './base-http-service';
import { UsersModel } from './../models/users-model'; 

@Injectable()
export class LoginService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	login(usersModel: UsersModel): Promise<UsersModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/login', usersModel)
            .then(function (response) {
                return response as UsersModel;
            });
	}

	forgotPassword(emailId:string){
		return this.baseHttpService.Post(this.baseUrl +  '/login/forgotPassword?emailId='+emailId,null)
            .then(function (response) {
                return response;
            });
	}
}
