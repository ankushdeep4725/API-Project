import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BaseHttpService } from './base-http-service';
import { UsersModel } from './../models/users-model'; 
import { MessageModel } from './../models/message-model'; 

//import { ChangepasswordModel } from '../lawyersection/lawyerchangepassword/changepassword-model';
import { Observable } from 'rxjs';
@Injectable()
export class RegisterService {

	baseUrl = environment.url;

	constructor(private baseHttpService: BaseHttpService) { }


	registerProfile(usersModel: UsersModel): Promise<UsersModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/register', usersModel)
            .then(function (response) {
                return response as UsersModel;
            });
	}

	sendMessage(messageModel: MessageModel): Promise<MessageModel> {
		return this.baseHttpService.Post(this.baseUrl +  '/registration/SendMessage', messageModel)
            .then(function (response) {
                return response as MessageModel;
            });
	}


	// registerClient(registerModel: RegisterModel): Promise<RegisterModel> {
	// 	return this.baseHttpService.Post(this.baseUrl +  '/registration/register', registerModel)
    //         .then(function (response) {
    //             return response as RegisterModel;
    //         });
	// }

	// updateImage(fileToUpload: File, emailId:string) {
	// 	const endpoint = 'your-destination-url';
	// 	const formData: FormData = new FormData();
	// 	formData.append('fileKey', fileToUpload, fileToUpload.name);
	// 	return this.baseHttpService
	// 	  .Post(this.baseUrl+'/registration/updateImage?emailId='+ emailId,formData)
	// 	  .then(function(response) {
	// 		return response;
	// 	  });
	// }

	// updateProfile(registerModel: RegisterModel): Promise<RegisterModel> {
	// 	console.log(registerModel);
	// 	return this.baseHttpService.Post(this.baseUrl +  '/registration/updateProfile', registerModel)
    //         .then(function (response) {
    //             return response as RegisterModel;
    //         });
	// }


	// getAllLawyers() {
	// 	return this.baseHttpService.Get(this.baseUrl +  '/registration/getAllLawyers')
    //         .then(function (response) {
    //             return response;
    //         });
	// }


	// getAllClients() {
	// 	return this.baseHttpService.Get(this.baseUrl +  '/registration/getAllClients')
    //         .then(function (response) {
    //             return response;
    //         });
	// }


	// changeStatus(id: number): Promise<RegisterModel> {
	// 	return this.baseHttpService.Post(this.baseUrl +  '/registration/changeStatus?id='+ id, null)
    //         .then(function (response) {
    //             return response as RegisterModel;
    //         });
	// }


	// changePassword(changepasswordModel : ChangepasswordModel): Promise<ChangepasswordModel>{
	// 	return this.baseHttpService.Post(this.baseUrl +  '/registration/changePassword', changepasswordModel)
	// 	.then(function (response) {
	// 		return response as ChangepasswordModel;
	// 	});
	// }
	


	// getMemberByEmail(email: string) {
	// 	return this.baseHttpService.Get(this.baseUrl +  '/registration/getMemberByEmail?email='+ email)
    //         .then(function (response) {
    //             return response;
    //         });
	// }


	// getCases(email: string) {
	// 	return this.baseHttpService.Get(this.baseUrl +  '/registration/GetCases?email='+ email)
    //         .then(function (response) {
    //             return response;
    //         });
	// }


	// verifyToken(token: string): Promise<RegisterModel> {
	// 	return this.baseHttpService.Post(this.baseUrl +  '/registration/verifyToken?token='+ token, null)
    //         .then(function (response) {
    //             return response as RegisterModel;
    //         });

	// }
	
	
	
}
