import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent} from './events/events.component'
import {AppComponent} from './app.component'
import {WelcomeComponent} from './welcome/welcome.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PanelComponent} from './panel/panel.component';
// import { SchedulesComponent } from './schedules/schedules.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'users',
    component: UserDetailsComponent
  },
  {
    path:'events',
    component:EventsComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'panel',
    component: PanelComponent
  },
  // {
  //   path: 'schedules',
  //   component: SchedulesComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
