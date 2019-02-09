import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersModel } from './../models/users-model'; 
import { BaseHttpService } from './base-http-service';

@Injectable()
export class PasswordService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	changePassword(usersModel: UsersModel): Promise<UsersModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/changePassword', usersModel)
            .then(function (response) {
                return response as UsersModel;
            });
	}

	changeTransactionPassword(usersModel: UsersModel): Promise<UsersModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/changeTransactionPassword', usersModel)
            .then(function (response) {
                return response as UsersModel;
            });
	}

	checkTransactionPassword(accountNumber: string, transactionPassword : string) {
		return this.baseHttpService.Get(this.baseUrl +  '/registration/CheckTransactionPassword?accountNumber='+ accountNumber+'&transactionPassword='+transactionPassword)
            .then(function (response) {
                return response;
            });
	}
	
}
