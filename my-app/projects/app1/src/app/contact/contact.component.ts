import { Component, OnInit } from '@angular/core';
import {  MessageModel } from '../../../../../../my-app/src/app/models/message-model';
import { RegisterService } from '../../../../../../my-app/src/app/services/register.service'
import { ToastrService } from 'ngx-toastr';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  messageModel: MessageModel  = {
    name: "",
    email: "",
    subject: "",
    message: "",
    messageType:"ContactUs"
  };

  responsemessage:string = "";
  constructor(private registerService: RegisterService, private toastr: ToastrService) { }

  ngOnInit() {}


  sendMessage()
  {
    this.blockUI.start('Loading...');
    //console.log(this.messageModel);
    this.registerService.sendMessage(this.messageModel)
    .then((response:MessageModel) => {
      this.blockUI.stop();
      if(response)
      {
        this.toastr.success("We will shortly send you response to your query.");
        //this.responsemessage = "We will shortly send you response to your query.";
      }
      else{
        this.toastr.error("Error while submitting your queestion.");
        //this.responsemessage  = "Error while submitting your queestion.";
      }
    }, (error: any) => {
      console.log("I am here");
     this.blockUI.stop();
     });

  }
}
