import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsersModel } from './../models/users-model'; 
import { TransactionsModel } from './../models/transactions-model'; 
import { BaseHttpService } from './base-http-service';

@Injectable()
export class TransactionsService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }

	getTransactions(accountNumber: string, startDate: string, endDate: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/getTransactions?accountNumber='+ accountNumber+'&startDate='+startDate+'&endDate='+endDate)
            .then(function (response) {
                return response;
            });
	}

	getLastTenTransactions(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/getLastTenTransactions?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}

	getFinalLastTenTransactions(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/GetFinalLastTenTransactions?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}

	checkAccountExists(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/account/checkAccountExists?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}

	addTransactionsForBankServices(accountNumber:string, message:string, amount:string){
		return this.baseHttpService.Get(this.baseUrl +  '/account/AddTransactionsForBankServices?accountNumber='+ accountNumber+'&message='+message+'&amount='+amount)
            .then(function (response) {
                return response;
            });
	}

	addTransactionsForDifferentBank(transactionsModel: TransactionsModel): Promise<TransactionsModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/addTransactionsForDifferentBank', transactionsModel)
            .then(function (response) {
                return response as TransactionsModel;
            });
	}


	addTransactionsForSameBank(transactionsModel: TransactionsModel): Promise<TransactionsModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/addTransactionsForSameBank', transactionsModel)
            .then(function (response) {
                return response as TransactionsModel;
            });
	}

	
	addFirstTransactions(transactionsModel: TransactionsModel): Promise<TransactionsModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/account/AddFirstTransactions', transactionsModel)
            .then(function (response) {
                return response as TransactionsModel;
            });
	}

}
