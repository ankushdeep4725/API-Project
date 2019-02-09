import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberSectionComponent} from './membersection/membersection.component';
import { DashboardComponent } from './membersection/dashboard/dashboard.component';
import { UserProfileComponent } from './membersection/userprofile/userprofile.component';
import { EditProfileComponent } from './membersection/editprofile/editprofile.component';
import { AddBeneficiaryComponent } from './membersection/addbeneficiary/addbeneficiary.component';
import { BankStatementsComponent } from './membersection/bankstatements/bankstatements.component';
import { ChangePasswordsComponent } from './membersection/changepwd/changepwd.component';
import { ViewBeneficiaryComponent } from './membersection/viewbeneficiary/viewbeneficiary.component';
import { CheckBookComponent } from './membersection/checkbook/checkbook.component';
import { BankServicesComponent } from './membersection/bankservices/bankservices.component';
import { FundTransferToBeneficiaryComponent } from './membersection/fundtransfertobeneficiary/fundtransfertobeneficiary.component';
import { FundTransferToOtherComponent } from './membersection/fundtransfertoother/fundtransfertoother.component';
import { FundTransferToOwnComponent } from './membersection/fundtransfertoown/fundtransfertoown.component';
import { InterestCalcComponent } from './membersection/interestcalc/interestcalc.component';
import { LockScreenComponent } from './lockscreen/lockscreen.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [ 
  { path: 'membersection/view', component: MemberSectionComponent,
    children: [
  { path: 'dashboard:/v', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'userprofile', component: UserProfileComponent,  },
  { path: 'editprofile', component: EditProfileComponent,  },
  { path: 'addbeneficiary', component: AddBeneficiaryComponent, },
  { path: 'bankstatements', component: BankStatementsComponent,  },
  { path: 'changepwd', component: ChangePasswordsComponent, },
  { path: 'viewbeneficiary', component: ViewBeneficiaryComponent, },
  { path: 'checkbook', component: CheckBookComponent, },
  { path: 'bankservices', component: BankServicesComponent,  },
  { path: 'fundstransfertobeneficiary', component: FundTransferToBeneficiaryComponent,  },
  { path: 'fundstransfertoother', component: FundTransferToOtherComponent, },
  { path: 'fundstransfertoown', component: FundTransferToOwnComponent,},
  { path: 'interestcalc', component: InterestCalcComponent,}
  ]},
  { path: 'lockscreen', component: LockScreenComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ],
  exports: [RouterModule]
})
export class App2RoutingModule { }
