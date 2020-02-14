import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { userData } from './userData';
import {ApiService} from '.././api.service';
import { UserDetailsComponent }from '.././user-details/user-details.component'

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  // Email:string;
  // Name:string;
  // role:number;
  roles:number[]=[1,2,3,4];
  launchAddUserModal: boolean;
  launchEditUserModal: boolean;
  launchDeleteUserModal: boolean;
  // currentRole:number;
  // selectedRole:number;
  // formisvalid:boolean;
  constructor(
    public dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: userData,
    public api: ApiService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addUser(data) {
    console.log('data', data)
    this.api.createUser(data).subscribe((reponse)=>{
      console.log(reponse);
     });
  }

  editUser(data) {
    console.log('data', data)
    this.api.editUser(data).subscribe((reponse)=>{
      console.log(reponse);
     });
  }

  deleteUser(email) {
    console.log('email', email)
    this.api.deleteUser(email).subscribe((reponse)=>{
      console.log(reponse);
     });
  }

  ngOnInit() {
  }

}
