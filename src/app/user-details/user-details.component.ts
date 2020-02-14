import { Component, OnInit } from '@angular/core';
import {ApiService} from '.././api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material'
import { AddUserModalComponent } from '.././add-user-modal/add-user-modal.component';
@Component({
  selector: 'app-details-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  users;
  usersColumns = ['Email','Name','Role','Edit','Delete'];
  Email:string;
  Name:string;
  Role:number;
  dataSource = new MatTableDataSource();

  // response:any;


  constructor(private api: ApiService,
              private dialog: MatDialog) { }



  ngOnInit() {
    this.api.getUsers()
      .subscribe(data => this.dataSource = data);
  }

  editUser(email) {
    // this.launchAddUserModal=true;
    console.log('email',email)
    this.api.getUser(email).subscribe(response => {
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '250px',
        data: {Email: response.Email, Name: response.Name, Role: response.Role}
      });
      dialogRef.componentInstance.launchEditUserModal=true;
      dialogRef.afterClosed().subscribe(data => {
        console.log(data);
        this.api.getUsers()
          .subscribe(data => this.dataSource = data);
        // this.Email = data.Email;
        // this.Name = data.Name;
        // this.Role = data.Role;
      });
     });
  }

  deleteUser(email) {
    // this.launchAddUserModal=true;
    console.log('email',email)
    this.api.getUser(email).subscribe(response => {
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '250px',
        data: {Email: response.Email}
      });
      dialogRef.componentInstance.launchDeleteUserModal=true;
      dialogRef.afterClosed().subscribe(data => {
        console.log(data);
        this.api.getUsers()
          .subscribe(data => this.dataSource = data);
        // this.Email = data.Email;
        // this.Name = data.Name;
        // this.Role = data.Role;
      });
     });
  }

  openDialog(): void {
      // this.userModal.launchAddUserModal=true;
      const dialogRef = this.dialog.open(AddUserModalComponent, {
        width: '250px',
        data: {Email: this.Email, Name: this.Name, Role: this.Role}
      });

      dialogRef.componentInstance.launchAddUserModal=true;

      dialogRef.afterClosed().subscribe(data => {
        console.log(data);
        this.api.getUsers()
          .subscribe(data => this.dataSource = data);
        // this.Email = data.Email;
        // this.Name = data.Name;
        // this.Role = data.Role;
      });
    }

}
