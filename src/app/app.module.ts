import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import {AuthService} from './auth.service';
import {HttpModule} from "@angular/http";
import { EventsComponent } from './events/events.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { AddScheduleModalComponent } from './add-schedule-modal/add-schedule-modal.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    WelcomeComponent,
    DashboardComponent,
    PanelComponent,
    SchedulesComponent,
    AddScheduleModalComponent,
    UserLoginComponent,
    UserDetailsComponent,
    AddUserModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpModule
  ],
  providers: [ApiService, AuthService],
  bootstrap: [AppComponent],
  entryComponents: [AddScheduleModalComponent,AddUserModalComponent]
})
export class AppModule { }
