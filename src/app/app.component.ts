import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTitle()
      .subscribe(data => this.title = data.title);

    console.log(this.title);
  }

}
