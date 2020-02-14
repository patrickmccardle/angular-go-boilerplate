import { Injectable } from '@angular/core';
import {Http,RequestOptions} from '@angular/http';
import {Post} from './Post';
import {environment} from '../environments/environment';
import {Observable, of} from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  getTitle() {
    return this.http.get(`${environment.serverUrl}/hello-world`)
      .map(response => response.json());
  }

  getEvents() {
    return this.http.get(`${environment.serverUrl}/events`)
      .map(response => response.json());
  }

  getSchedules() {
    return this.http.get(`${environment.serverUrl}/schedules`)
      .map(response => response.json());
  }

  getUsers() {
    return this.http.get(`${environment.serverUrl}/users`)
      .map(response => response.json());
  }

  getUser(email) {
    return this.http.get(`${environment.serverUrl}/user/` + email)
      .map(response => response.json());
      // console.log('response',response)
  }

  editUser(data) {
    console.log('data',data)
    return this.http.post(`${environment.serverUrl}/user/update/` + data.Email,data)
      .map(response => response.json());
  }

  deleteUser(email) {
    return this.http.delete(`${environment.serverUrl}/user/` + email)
      .map(response => response);
  }

  createUser(data) {
    console.log('data',data)
    // let body = data;
    // console.log('body',body)
    return this.http.post(`${environment.serverUrl}/createUser`,data)
      .map(response => response.json());
  }

  ELEMENT_DATA: Post[] = [
    {position: 0, title: 'Post One', category: 'Web Development', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Post Two', category: 'Android Development', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Post Three', category: 'IOS Development', date_posted: new Date(), body: 'Body 3'},
    {position: 3, title: 'Post Four', category: 'Android Development', date_posted: new Date(), body: 'Body 4'},
    {position: 4, title: 'Post Five', category: 'IOS Development', date_posted: new Date(), body: 'Body 5'},
    {position: 5, title: 'Post Six', category: 'Web Development', date_posted: new Date(), body: 'Body 6'},
  ];
  categories = [
    {value: 'Web-Development', viewValue: 'Web Development'},
    {value: 'Android-Development', viewValue: 'Android Development'},
    {value: 'IOS-Development', viewValue: 'IOS Development'}
  ];

  getData(): Observable<Post[]> {
    return of<Post[]>(this.ELEMENT_DATA);
  }

  getCategories() {
    return this.categories;
  }

  addPost(data) {
    this.ELEMENT_DATA.push(data);
  }

  deletePost(index) {
    this.ELEMENT_DATA = [...this.ELEMENT_DATA.slice(0, index), ...this.ELEMENT_DATA.slice(index + 1)];
  }

  dataLength() {
    return this.ELEMENT_DATA.length;
  }

}
