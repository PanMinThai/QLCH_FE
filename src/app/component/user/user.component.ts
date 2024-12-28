import { Component, OnInit, ViewChild } from '@angular/core';
import { Users } from '../../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  UserList!: Users[];
  displayedColumns: string[] = ["UserName", "Name", "Email", "Phone", "Role", "Status","Action"];
  datasource: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private toastr: ToastrService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.Loadusers();
  }


  Loadusers() {
    this.service.GetAllUsers().subscribe(item => {
      this.UserList = item;
      this.datasource = new MatTableDataSource<Users>(this.UserList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  UpdateRole(id: string) {
    this.Openpopup(id,'role');
  }

  UpdateStatus(code: string) {
    this.Openpopup(code,'status');
  }

  Openpopup(id: string, type: string) {
    this.dialog.open(UserUpdateComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        userid: id,
        type: type
      }
    }).afterClosed().subscribe(item=>{
      this.Loadusers();
    })
  }



}
