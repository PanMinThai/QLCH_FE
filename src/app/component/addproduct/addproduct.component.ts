import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})

export class AddproductComponent implements OnInit {

  _response: any;
  title = 'Add Product';
  editId = '';
  isedit = false;
  editdata!: Product;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: ProductService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editId = this.act.snapshot.paramMap.get('id') as string;
 //   console.log(this.editId);
    
    if (this.editId != '' && this.editId != null) {
      this.isedit = true
      this.title = 'Edit Product';
      this.productform.controls['id'].disable();
      this.service.GetbyId(this.editId).subscribe(item => {
        this.editdata = item;
        this.productform.setValue({
          id: this.editdata.id, 
          imageId: this.editdata.imageId, 
          productname: this.editdata.productname,
          sellingprice: this.editdata.sellingprice, 
          costprice: this.editdata.costprice, 
          unit : this.editdata.unit,
          avaiablequatity: this.editdata.avaiablequatity,
          note:this.editdata.note,
        })
      })
    }

  }

  productform = this.builder.group({
    id: this.builder.control(''),
    imageId: this.builder.control(''),
    productname: this.builder.control('', Validators.required),
    sellingprice: this.builder.control(0, Validators.required),
    costprice: this.builder.control(0, Validators.required),
    unit: this.builder.control('', Validators.required),
    avaiablequatity: this.builder.control(0, Validators.required),
    note: this.builder.control('', Validators.required)
  })

  SaveProduct() {
    if (this.productform.valid) {

      let _obj: Product = {
        id: this.productform.value.id as string,
        imageId: this.productform.value.imageId as string,
        productname: this.productform.value.productname as string,
        sellingprice: this.productform.value.sellingprice as number,
        costprice: this.productform.value.costprice as number,
        unit: this.productform.value.unit as string,
        avaiablequatity: this.productform.value.avaiablequatity as number,
        note: this.productform.value.note as string
      }

      if (!this.isedit) {
        this.service.CreateProduct(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/Product');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editId;
        this.service.UpdateProduct(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/Product');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}
