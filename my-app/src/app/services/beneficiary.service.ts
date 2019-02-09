import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BeneficiaryModel } from './../models/beneficiary-model'; 
import { BaseHttpService } from './base-http-service';

@Injectable()
export class BeneficiaryService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	addBeneficiary(beneficiaryModel: BeneficiaryModel): Promise<BeneficiaryModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/addBeneficiary', beneficiaryModel)
            .then(function (response) {
                return response as BeneficiaryModel;
            });
	}

	viewBeneficiary(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/viewBeneficiary?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}
}
