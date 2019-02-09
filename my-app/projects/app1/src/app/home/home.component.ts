import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {  MessageModel } from '../../../../../../my-app/src/app/models/message-model';
import { RegisterService } from '../../../../../../my-app/src/app/services/register.service'
import { ToastrService } from 'ngx-toastr';
import { NgbdCarouselBasic } from './../carousel-basic';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  
  messageModel: MessageModel  = {
    name: "",
    email: "",
    subject: "",
    message: "",
    messageType:"Frequently Asked Question"
  };

  responsemessage:string = "";

  images: any;
 
  constructor(private router: Router, private registerService: RegisterService,
    private toastr: ToastrService) { }

    

  ngOnInit() {
    //this.images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  }

  navigate(path){
    this.router.navigate([path]);
  }

  sendMessage()
  {
    this.blockUI.start('Loading...');
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
