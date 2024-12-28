import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MenuPermission } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MembershipCard } from '../../models/membershipcard.model';
import { MembershipcardService } from '../../services/membershipcard.service';
import { CardtypeService } from '../../services/cardtype.service';

@Component({
  selector: 'app-membershipcard',
  standalone: true,
  imports: [MaterialModule,RouterLink,MatSortModule],
  templateUrl: './membershipcard.component.html',
  styleUrl: './membershipcard.component.css'
})
export class MembershipcardComponent implements OnInit {
  private _liveAnnouncer = inject(LiveAnnouncer);

  MembershipCardList!: MembershipCard[];
  displayedColumns: string[] = ["customerName", 
                                "phone", 
                                "cardTypeName",
                                "accumulatedPoints", 
                                "usedPoints", 
                                "accumulatedAmount", 
                                "usedAmount", 
                                "Action"];
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
  dataSource = new MatTableDataSource(this.MembershipCardList);

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

  constructor(private service: MembershipcardService, 
              private userservice: UserService, 
              private cardtypeservice: CardtypeService, 
              private toastr: ToastrService,
              private router: Router) {

  }
  ngOnInit(): void {
    this.Setaccess();
    this.LoadMembershipCard();
  }

  Setaccess() {

    let roleid = localStorage.getItem('userRole') as string;
    this.userservice.GetMenuPermission(roleid, 'MembershipCard').subscribe(item => {

      this._permission = item;  
 //     console.log(this._permission);
    })
  }

  LoadMembershipCard() {
    this.service.Getall().subscribe(item => {
      this.MembershipCardList = item;
      this.datasource = new MatTableDataSource<MembershipCard>(this.MembershipCardList);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
      //console.log(item);
      
    })
  }

  EditMembershipCard(id: string) {
    if (this._permission.haveEdit) {
      this.router.navigateByUrl('/MembershipCard/edit/' + id)
      
    } else {
      this.toastr.warning('User not having edit access', 'warning')
    }
  }

  DeleteMembershipCard(id: string) {
    if (this._permission.haveDelete) {
      if (confirm('Are you sure?')) {
        this.service.DeleteMembershipCard(id).subscribe(item=>{
          this._response=item;
          if (this._response.result === 'pass') {
            this.toastr.success('Deleted successfully', 'Success');
            this.LoadMembershipCard();
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

