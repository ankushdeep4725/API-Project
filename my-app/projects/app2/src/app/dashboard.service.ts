import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../../my-app/src/environments/environment';
import { UsersModel } from './../../../../../my-app/src/app/models/users-model'; 
import { BaseHttpService } from './../../../../../my-app/src/app/services/base-http-service';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DashboardService {

	baseUrl = environment.url;
	currentUserImage:any = "";

	onMainEvent = new EventEmitter();

	constructor(private baseHttpService: BaseHttpService) { }

	getProfile(accountNumber: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/registration/getProfile?accountNumber='+ accountNumber)
            .then(function (response) {
                return response;
            });
	}

	getProfileByRandomText(randomText: string) {
		return this.baseHttpService.Get(this.baseUrl +  '/registration/getProfileByRandomText?randomText='+ randomText)
            .then(function (response) {
                return response;
            });
	}


	updateProfile(usersModel: UsersModel): Promise<UsersModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/UpdateProfile', usersModel)
            .then(function (response) {
                return response as UsersModel;
            });
	}

	updateImage(fileToUpload: File, accountnumber:string): Promise<any> {
		const formData: FormData = new FormData();
		formData.append('fileKey', fileToUpload, fileToUpload.name);

		return this.baseHttpService.Post(this.baseUrl +  '/registration/updateImage?accountnumber='+ accountnumber,formData)
            .then(function (response) {
                return response as UsersModel;
            });
	}


	destroyRamdonText(accountnumber:string) {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/DestroyRamdonText?accountnumber='+ accountnumber,null)
            .then(function (response) {
				return response;
			});
	}

	

}
