import { Component, OnInit } from '@angular/core';
import {ApiService} from '.././api.service';
import {Post} from '../Post';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private api: ApiService) {
  }

  displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.api);
}

export class PostDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.api.getData();
  }

  disconnect() {
  }
}
