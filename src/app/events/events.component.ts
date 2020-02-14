import { Component, OnInit } from '@angular/core';
import {ApiService} from '.././api.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {Post} from '../Post';
import { MatSort, MatTableDataSource } from '@angular/material'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {



  constructor(private api: ApiService) { }

  events;
  eventColumns = ['ID','Title','Description','delete'];
  dataSource = new MatTableDataSource();

  ngOnInit() {

    this.api.getEvents()
      .subscribe(data => this.dataSource = data);
    console.log('schedules', this.events)
    console.log('dataSource', this.dataSource)

  }

}
// export class PostDataSource extends DataSource<any> {
//   constructor(private api: ApiService) {
//     super();
//   }
//
//   connect(): Observable<Post[]> {
//     return this.api.getEvents();
//   }
//
//   disconnect() {
//   }
// }
