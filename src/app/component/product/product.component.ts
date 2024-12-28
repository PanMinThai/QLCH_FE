import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MenuPermission } from '../../models/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { MaterialModule } from '../../material.module';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MaterialModule,RouterLink,MatSortModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
  export class ProductComponent implements OnInit {
    private _liveAnnouncer = inject(LiveAnnouncer);

    productList!: Product[];
    displayedColumns: string[] = ["imageId", "productname", "sellingprice", "costprice", "unit", "avaiablequatity", "note","Action"];
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
    dataSource = new MatTableDataSource(this.productList);

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

    constructor(private service: ProductService, private userservice: UserService, private toastr: ToastrService,
      private router: Router) {

    }
    ngOnInit(): void {
      this.Setaccess();
      this.LoadProduct();
    }

    Setaccess() {

      let roleid = localStorage.getItem('userRole') as string;
      this.userservice.GetMenuPermission(roleid, 'Product').subscribe(item => {

        this._permission = item;  
  //     console.log(this._permission);
      })
    }

    LoadProduct() {
      this.service.Getall().subscribe(item => {
        this.productList = item;
        this.datasource = new MatTableDataSource<Product>(this.productList);
        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;
        //console.log(item);
        
      })
    }

    EditProduct(id: string) {
      if (this._permission.haveEdit) {
        this.router.navigateByUrl('/Product/edit/' + id)
        
      } else {
        this.toastr.warning('User not having edit access', 'warning')
      }
    }

    DeleteProduct(id: string) {
      if (this._permission.haveDelete) {
        if (confirm('Are you sure?')) {
          this.service.DeleteProduct(id).subscribe(item=>{
            this._response=item;
            if (this._response.result === 'pass') {
              this.toastr.success('Deleted successfully', 'Success');
              this.LoadProduct();
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

