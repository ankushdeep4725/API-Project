import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { DataService } from '../../../../../../../my-app/src/app/services/data.service';
import { AuthService } from './../../auth.service';
import { accountNumber } from '../../../../../../../my-app/src/environments/environment';
import { TransactionsService } from '../../../../../../../my-app/src/app/services/transactions.service';
import { DatePipe } from '@angular/common';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as Highcharts from 'highcharts';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profileData: any;
  currentAccountNumber: any;
  bankstatment : any = [];
  transactionList:any;
  @BlockUI() blockUI: NgBlockUI;

  Highcharts = Highcharts;
  chartOptions = {}
  isData: boolean = false;
  setDate: any;
  setMonth: any;
  setYear: any;
  setDay: any;
  setTime: any;

  constructor(private dashboardService: DashboardService, private dataService: DataService,
    private transactionsService: TransactionsService, private datePipe: DatePipe,
    private route: ActivatedRoute,  private authService: AuthService) {

      
      
      let today = new Date();
      this.setDate = today.getDate();
      let month = today.getMonth() + 1; //January is 0!
      this.setYear = today.getFullYear();
      this.setMonth  = today.toLocaleString('en-us', { month: 'long' });
      // const year = today.toLocaleString('en-us', { year: 'long' });
      this.setTime = this.formatAMPM(today);

      var weekdays = new Array(7);
        weekdays[0] = "Sunday";
        weekdays[1] = "Monday";
        weekdays[2] = "Tuesday";
        weekdays[3] = "Wednesday";
        weekdays[4] = "Thursday";
        weekdays[5] = "Friday";
        weekdays[6] = "Saturday";
        this.setDay = weekdays[today.getDay()];
     }

      formatAMPM(date) {
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
    }

  

  ngOnInit() 
  {
    this.route.queryParams.subscribe((params) => {
      let randomText = params["v"];

      if(randomText)
      {
        this.getProfileByRandomText(randomText); 
      }
      else
      {
        if(localStorage.getItem("accnum") !== null)
        {
          this.currentAccountNumber = localStorage.getItem("accnum");
          this.getProfile(); 
          this.getChartData();
        }
        else
        {
          this.authService.logout();
        }
      }

     
    });
  
  
  }


  getProfileByRandomText(randomText)
  {
    this.blockUI.start('Loading...');

    
    this.dashboardService.getProfileByRandomText(randomText)
    .then((response: any) => {
      if(!response)
      {
        this.authService.simpleLogout();
      }
      this.profileData = response;
      this.blockUI.stop();
      console.log(this.profileData);
      localStorage.setItem("accnum", response["accountnumber"]);
      let fullname = response["firstname"] + " "+ response["lastname"];
      localStorage.setItem("accname",fullname);
      localStorage.setItem("isactive", "true");
      localStorage.setItem("username", response["username"]);
      localStorage.setItem("userimage",  'data:image/png;base64,'+ response["image"]);
      this.currentAccountNumber = response["accountnumber"];
      this.getChartData();
      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.currentUserImage = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
   }, (error: any) => {
     console.log("I am here");
    this.blockUI.stop();
  });
  }

  getProfile()
  {
    this.blockUI.start('Loading...');
    console.log(this.currentAccountNumber);

    this.dashboardService.getProfile(this.currentAccountNumber)
    .then((response: any) => {
      this.profileData = response;
      this.blockUI.stop();
      console.log(this.profileData);
      this.dashboardService.currentUserImage =  'data:image/png;base64,'+ response["image"];
      localStorage.setItem("userimage",  'data:image/png;base64,'+ response["image"]);
      this.profileData.image = 'data:image/png;base64,'+ response["image"];
      this.dashboardService.onMainEvent.emit(this.profileData);
   }, (error: any) => {
    this.blockUI.stop();
  });
  }

  getChartData()
  {
    
    this.transactionsService.getLastTenTransactions(this.currentAccountNumber)
    .then((response: any) => {
      this.transactionList = response; 
      console.log(this.transactionList); 
      this.transactionList.forEach(transaction => {
        let accNumber = "";
        let credit = "";
        let debit = "";

        if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == null)
        {
          this.bankstatment.push({accountNumber: transaction.name + " Charges", 
          credit: transaction.creditamount , debit: "0", 
          transactiondate: this.datePipe.transform(new Date(transaction.transactiondate))}); 
        }
        if(this.currentAccountNumber == transaction.senderaccountnumber && transaction.receiveraccountnumber == this.currentAccountNumber)
        {
          this.bankstatment.push({accountNumber: transaction.name + " Charges", 
            credit:"0" , debit: transaction.debitamount, 
            transactiondate: this.datePipe.transform(new Date(transaction.transactiondate))}); 
        }
        else if(this.currentAccountNumber == transaction.senderaccountnumber)
        {
          this.bankstatment.push({accountNumber: transaction.receiveraccountnumber, 
            credit:"0" , debit: transaction.debitamount, 
            transactiondate: this.datePipe.transform(new Date(transaction.transactiondate))});
        }
        else
        {
          this.bankstatment.push({accountNumber: transaction.senderaccountnumber, 
            debit:"0" , credit: transaction.debitamount, 
            transactiondate: this.datePipe.transform(new Date(transaction.transactiondate))});
        }
      })

      var result = [];
      this.bankstatment.reduce(function(res, value) {
        if (!res[value.transactiondate]) {
          res[value.transactiondate] = { Date : value.transactiondate, credit: 0, debit:0 };
          result.push(res[value.transactiondate])
        }
        res[value.transactiondate].credit += parseFloat(value.credit);
        res[value.transactiondate].debit +=  parseFloat(value.debit);
        return res;
      }, {});

      console.log(result)

      let categorieslist = [];
      let creditlist = [];
      let debitlist = [];

      result.slice(-6).forEach((item) => { 
        categorieslist.push(item.Date);
        creditlist.push(item.credit);
        debitlist.push(item.debit);
      });

      this.chartOptions = {
        chart: {
        type: 'column'
          },
          title: {
              text: ''
          },
          subtitle: {
              text: ''
          },
          xAxis: {
            categories:categorieslist,
          crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: '$ Amount Range'
              }
          },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>$ {point.y:.2f}</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          credits: { 
            enabled:  false,
            text: ""
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0,
                  dataLabels: {
                    enabled: true,
                    format: '$ {y}'
                }
              },
          },
          series: [{
              name: 'Credit',
              color: '#e67a77',
              data: creditlist
          },
          {
            name: 'Debit',
            color: "#1fb5ac",
            data: debitlist
        }]
      };
  
      this.isData = true;
    });
  }

}
