import { Component, OnInit , AfterViewInit, OnDestroy } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DashboardService } from './../dashboard.service';
import { accountNumber } from '../../../../../../my-app/src/environments/environment';
import { TransactionsService } from '../../../../../../my-app/src/app/services/transactions.service';
import { DatePipe } from '@angular/common';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { Idle , DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';


@Component({
  selector: 'app-root',
  templateUrl: './membersection.component.html',
  styleUrls: ['./membersection.component.css']
})
export class MemberSectionComponent implements OnInit, OnDestroy {

  @BlockUI() blockUI: NgBlockUI;
  title = 'app2';

  profileData: any;
  currentAccountNumber: any;
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  onMainEvent: any;

  constructor(private dashboardService: DashboardService,private authService: AuthService,
    private transactionsService: TransactionsService, private datePipe: DatePipe,
    private router: Router,  private idle: Idle, private keepalive: Keepalive)
    {

      
      document.body.style.backgroundColor = "white";
      idle.setIdle(60);
      // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
      idle.setTimeout(60);
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  
      idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        console.log("time out");
        localStorage.setItem("isactive", "false");
        //this.dashboardService.onMainEvent.emit(this.profileData);
        this.router.navigate(["lockscreen"]);
      });
      idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
      idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
  
      // sets the ping interval to 15 seconds
      keepalive.interval(15);
  
      keepalive.onPing.subscribe(() => this.lastPing = new Date());
  
      this.reset();
    }

  reset() {
      this.idle.watch();
      this.idleState = 'Started.';
      this.timedOut = false;
  }

  ngOnDestroy(){
    this.onMainEvent.unsubscribe();
  }

  ngOnInit()
  {
    this.onMainEvent = this.dashboardService.onMainEvent.subscribe(
      (onMain) => {
        console.log(onMain);
        this.profileData = onMain;
      }
    );
  }

  ngAfterViewInit() {
    this.dashboardService.onMainEvent.subscribe(
      (onMain) => {
        console.log(onMain);
        this.profileData = onMain;
      }
    );
  }

  getProfile()
  {
    console.log(this.currentAccountNumber);

    this.dashboardService.getProfile(this.currentAccountNumber)
    .then((response: any) => {
      this.profileData = response;
      console.log(this.profileData);
      this.profileData.image = 'data:image/png;base64,'+ response.image;

      this.dashboardService.onMainEvent.subscribe(
        (onMain) => {
          this.profileData = onMain;
        }
      );

      }, (error: any) => {

      });
  }

  logOut(){
    this.authService.logout(); 
  }

}
