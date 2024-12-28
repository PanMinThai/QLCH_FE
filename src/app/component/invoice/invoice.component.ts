import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatSortModule } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InvoiceDetail } from '../../models/invoiceDetail.model';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [MaterialModule,MatSortModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit, OnDestroy {

  invoiceList: InvoiceDetail[] = [];
  subscription = new Subscription();
  displayedColumns: string[] = ['id', 'name', 'address', 'nettotal', 'action'];
  displayedColumnsFilter: string[] = ['id-filter', 'name-filter', 'address-filter', 'nettotal-filter'];
  filterValues = {
    id: '', name: '', address: '', nettotal: ''
  }
  globalFilter = '';
  dataSource!: MatTableDataSource<InvoiceDetail>;
  constructor( private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {

    this.Loadallinvoice();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  Loadallinvoice() {
  }

  Addnewinvoivce() {
    this.router.navigateByUrl('invoice/create')
  }
  EditInvoice(invoiceno: any) {
    this.router.navigateByUrl('invoice/edit/' + invoiceno)
  }
  RemoveInvoice(invoiceno: any) {
  }

  filterChange(filter: string, event: any) {
  }

  customFilterPredicate() {
  }

}
