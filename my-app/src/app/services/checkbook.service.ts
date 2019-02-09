import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseHttpService } from './base-http-service';
import { CheckbookModel } from './../models/checkbook-model'; 

@Injectable()
export class CheckBookService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	issueCheckBook(checkbookModel: CheckbookModel): Promise<CheckbookModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/issueCheckBook', checkbookModel)
            .then(function (response) {
                return response as CheckbookModel;
            });
	}

	viewIssuedCheckBook(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/viewIssuedCheckBook?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}


}
