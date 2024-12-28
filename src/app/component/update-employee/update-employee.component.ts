import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../../material.module';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';
import { EmployeeService } from '../../services/employee.service';
import { Employee, EmployeeUpdate } from '../../models/employee.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-employee',
  standalone:true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent {
  dialogdata: any;
  branchlist!: Branch[]
  username!:string;
  name!:string;
  appUserId!:string;
  branchId!:string;
  branchName!:string;
  gender:boolean;
  position!:string;
  constructor(
    private builder: FormBuilder, 
    private toastr: ToastrService, 
    private branchservice: BranchService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ref: MatDialogRef<UpdateEmployeeComponent>, 
    private employeeService : EmployeeService,
    private userService:UserService,
  ) { }
    ngOnInit(): void {
      this.LoadBranchs();
      this.dialogdata = this.data;
      
      //console.log(this.dialogdata);
      if (this.dialogdata.employeeId !== '') {
        this.username = this.dialogdata.username;
        this.name = this.dialogdata.name;
        
        this.employeeService.GetbyId(this.dialogdata.employeeId).subscribe(item=>{
          this.appUserId = item.appUserId;
          this.employeeform.patchValue({ 
            username: this.dialogdata.username,
            name: this.dialogdata.name, 
            branchId: item.branchId,
            gender: item.gender,
            position: item.position
          });
              
              
        })


        // this.userService.GetUserById(this.appUserId).subscribe(item=>{
        //   this.username = item.userName;
        //   this.name = item.name;
        // })
        // this.branchservice.GetbyId(this.branchId).subscribe(item=>{
        //   this.branchName = item.branchName;
        // })
        
      } 
    }  
  LoadBranchs() {
    this.branchservice.GetAll().subscribe(item => {
      this.branchlist = item;
    })
  }
  employeeform = this.builder.group({
    username: this.builder.control({ value: this.username, disabled: true }),
    name: this.builder.control({ value: this.name, disabled: true }),
    branchId: this.builder.control('', Validators.required),
    gender: this.builder.control(true),
    position: this.builder.control('', Validators.required),
  })
  _response: any;
  ProceedChange() {
    if (this.employeeform.valid) {
      let _obj: EmployeeUpdate = {
        id: this.dialogdata.employeeId,
        appUserId: this.appUserId,
        branchId: this.employeeform.value.branchId as string,
        genderstring:""+this.employeeform.value.gender as string,
        position:this.employeeform.value.position as string
      }
      console.log(_obj);       
      this.employeeService.UpdateEmployee(_obj).subscribe(item => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success('Updated successfully', 'Employee Update');
          this.ClosePopUp();
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Employee Update')
        }
      })

    }
  }

  ClosePopUp() {
    this.ref.close();
  }
}
