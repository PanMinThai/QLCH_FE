import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { MenuPermission } from '../../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MaterialModule,MatSortModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})

export class EmployeeComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  employeeList!: Employee[];
  displayedColumns: string[] = ["UserName", "Name", "BranchName", "Gender", "Position","Action"];
  datasource: any;
  _response:any;
  _permission: MenuPermission = {
    id: '',
    haveView: false,
    haveAdd: false,
    haveEdit: false,
    haveDelete: false,
    roleId: '',
    menuCode: ''
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource(this.employeeList);

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(private service: EmployeeService, private userservice: UserService, 
    private toastr: ToastrService, private router: Router,private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.Setaccess();
    this.LoadEmployee();
  }

  Setaccess() {

    let roleid = localStorage.getItem('userRole') as string;
    this.userservice.GetMenuPermission(roleid, 'Employee').subscribe(item => {

      this._permission = item;  
    })
  }

  LoadEmployee() {
    this.service.GetAll().subscribe(item => {
      this.employeeList = item;
      this.datasource = new MatTableDataSource<Employee>(this.employeeList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      //console.log(item);
      
    })
  }


  UpdateEmployee(id: string,UserName:string,Name:string) {
    this.Openpopup(id,UserName,Name);
  }
    Openpopup(id: string,UserName:string,Name:string) {
      this.dialog.open(UpdateEmployeeComponent, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          employeeId: id,
          username:UserName,
          name:Name
        }
      }).afterClosed().subscribe(item=>{
        this.LoadEmployee();
      })
    }
}

