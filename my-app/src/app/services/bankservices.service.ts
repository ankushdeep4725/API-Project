import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseHttpService } from './base-http-service';
import { BankServicesModel } from './../models/bankservices-model'; 

@Injectable()
export class BankServicesService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	applyBankServices(bankServicesModel: BankServicesModel): Promise<BankServicesModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/applyBankServices', bankServicesModel)
            .then(function (response) {
                return response as BankServicesModel;
            });
	}

	viewAppliedBankService(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/viewAppliedBankService?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}


}
