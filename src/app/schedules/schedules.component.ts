import { Component, OnInit } from '@angular/core';
import {ApiService} from '.././api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort, MatTableDataSource } from '@angular/material'
import { AddScheduleModalComponent } from '.././add-schedule-modal/add-schedule-modal.component';
// import {addScheduleData} from '../add-schedule-modal/addScheduleData'
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  schedules;
  scheduleColumns = ['ID','PanelName','SwitchID','Operation','delete'];
  dataSource = new MatTableDataSource();

  animal:string;
  name:string;
  constructor(private api: ApiService,
              private dialog: MatDialog) { }



  ngOnInit() {
    this.api.getSchedules()
      .subscribe(data => this.dataSource = data);
  }

  openDialog(): void {
      const dialogRef = this.dialog.open(AddScheduleModalComponent, {
        width: '250px',
        data: {name: this.name, animal: this.animal}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.animal = result;
      });
    }

}
