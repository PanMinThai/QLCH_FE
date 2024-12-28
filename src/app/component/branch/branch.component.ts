import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Branch } from '../../models/branch.model';
import { MenuPermission } from '../../models/user.model';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { BranchService } from '../../services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [MaterialModule,RouterLink,MatSortModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent implements OnInit {
  faTrash = faTrash;
  plus = faPlusCircle;
  private _liveAnnouncer = inject(LiveAnnouncer);

  branchList!: Branch[];
  displayedColumns: string[] = ["BranchName", "Address", "Note","Action"];
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
  dataSource = new MatTableDataSource(this.branchList);

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

  constructor(private service: BranchService, private userservice: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.Setaccess();
    this.LoadBranch();
  }

  Setaccess() {

    let roleid = localStorage.getItem('userRole') as string;
    this.userservice.GetMenuPermission(roleid, 'Product').subscribe(item => {

      this._permission = item;  
 //     console.log(this._permission);
    })
  }

  LoadBranch() {
    this.service.GetAll().subscribe(item => {
      this.branchList = item;
      this.datasource = new MatTableDataSource<Branch>(this.branchList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      //console.log(item);
      
    })
  }

  EditBranch(id: string) {
    if (this._permission.haveEdit) {
      this.router.navigateByUrl('/Branch/edit/' + id)
      
    } else {
      this.toastr.warning('User not having edit access', 'warning')
    }
  }

  DeleteBranch(id: string) {
    if (this._permission.haveDelete) {
      if (confirm('Are you sure?')) {
        this.service.DeleteBranch(id).subscribe(item=>{
          this._response=item;
          if (this._response.result === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.LoadBranch();
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }
    } else {
      this.toastr.warning('User not having delete access', 'warning')
    }
  }
  
}

