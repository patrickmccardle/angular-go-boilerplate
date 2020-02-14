import {Component, OnInit} from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title;

  constructor(private api: ApiService,
              private auth: AuthService) {
                auth.handleAuthentication();

              }

  ngOnInit() {
  //   this.api.getTitle()
  //     .subscribe(data => this.title = data.title);
  //
  //   console.log(this.title);
  }

}
