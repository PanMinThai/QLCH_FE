import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Branch } from '../../models/branch.model';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-addbranch',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],  
  templateUrl: './addbranch.component.html',
  styleUrl: './addbranch.component.css'
})

export class AddbranchComponent implements OnInit {

  _response: any;
  title = 'Add Branch';
  editId = '';
  isedit = false;
  editdata!: Branch;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private router: Router,
    private service: BranchService, private act: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.editId = this.act.snapshot.paramMap.get('id') as string;
 //   console.log(this.editId);
    
    if (this.editId != '' && this.editId != null) {
      this.isedit = true
      this.title = 'Edit Branch';
      this.branchform.controls['id'].disable();
      this.service.GetbyId(this.editId).subscribe(item => {
        this.editdata = item;
        this.branchform.setValue({
          id: this.editdata.id, 
          branchName: this.editdata.branchName, 
          address: this.editdata.address,
          note: this.editdata.note, 
        })
      })
    }

  }

  branchform = this.builder.group({
    id: this.builder.control(''),
    branchName: this.builder.control('', Validators.required),
    address : this.builder.control('', Validators.required),
    note: this.builder.control(''),
  })

  SaveBranch() {
    if (this.branchform.valid) {

      let _obj: Branch = {
        id: this.branchform.value.id as string,
        branchName: this.branchform.value.branchName as string,
        address: this.branchform.value.address as string,
        note: this.branchform.value.note as string
      }

      if (!this.isedit) {
        this.service.CreateBranch(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Created successfully', 'Success');
            this.router.navigateByUrl('/Branch');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }else{
        _obj.id=this.editId;
        this.service.UpdateBranch(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result === 'pass') {
            this.toastr.success('Updated successfully', 'Success');
            this.router.navigateByUrl('/Branch');
          } else {
            this.toastr.error('Due to:' + this._response.message, 'Failed');
          }
        })
      }


    }
  }

}
