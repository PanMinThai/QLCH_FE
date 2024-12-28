import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardType } from '../../models/cardtype.model';
import { MenuPermission } from '../../models/user.model';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CardtypeService } from '../../services/cardtype.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cardtype',
  standalone:true,
  imports: [MaterialModule,RouterLink,MatSortModule],
  templateUrl: './cardtype.component.html',
  styleUrl: './cardtype.component.css'
})
export class CardtypeComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  cardtypeList!: CardType[];
  displayedColumns: string[] = ["Name", "Limit","Note","Action"];
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
  dataSource = new MatTableDataSource(this.cardtypeList);

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

  constructor(private service: CardtypeService, private userservice: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.Setaccess();
    this.LoadCardType();
  }

  Setaccess() {

    let roleid = localStorage.getItem('userRole') as string;
    this.userservice.GetMenuPermission(roleid, 'CardType').subscribe(item => {

      this._permission = item;  
 //     console.log(this._permission);
    })
  }

  LoadCardType() {
    this.service.GetAll().subscribe(item => {
      this.cardtypeList = item;
      this.datasource = new MatTableDataSource<CardType>(this.cardtypeList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      //console.log(item);
      
    })
  }

  EditCardType(id: string) {
    if (this._permission.haveEdit) {
      this.router.navigateByUrl('/CardType/edit/' + id)
      
    } else {
      this.toastr.warning('User not having edit access', 'warning')
    }
  }

  DeleteCardType(id: string) {
    if (this._permission.haveDelete) {
      if (confirm('Are you sure?')) {
        this.service.DeleteCardType(id).subscribe(item=>{
          this._response=item;
          if (this._response.result === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.LoadCardType();
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

