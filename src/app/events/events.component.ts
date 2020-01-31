import { Component, OnInit } from '@angular/core';
import {ApiService} from '.././api.service';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events=[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEvents()
      .subscribe(data => this.events = JSON.stringify(data));
    console.log('events', this.events)
  }

}
