import { Component, Inject, OnInit } from '@angular/core';
import { Roles, UpdateUser, Users } from '../../models/user.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-user-update',
  standalone:true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
  dialogdata: any;
  userdata!: Users;
  username!: string;
  rolelist!: Roles[]
  type = '';
  _response: any;
  constructor(private builder: FormBuilder, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any,
    private service: UserService, private ref: MatDialogRef<UserUpdateComponent>) {

  }
  ngOnInit(): void {
    this.loadroles();
    this.dialogdata = this.data;
    this.type = this.dialogdata.type;
    //console.log(this.dialogdata);
    if (this.dialogdata.userName !== '') {
      this.service.GetUserById(this.dialogdata.userid).subscribe(item => {
        this.userdata = item;
        this.username = item.userName;
        this.userform.setValue({ username: this.userdata.userName, role: this.userdata.role, status: this.userdata.isactive })
      })
    }

  }

  loadroles() {
    this.service.GetAllRoles().subscribe(item => {
      this.rolelist = item;
      
    })
  }

  userform = this.builder.group({
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control('', Validators.required),
    status: this.builder.control(true)
    
  })

  ProceedChange() { 
    if (this.userform.valid) {
      let _obj: UpdateUser = {
        userName: this.username,
        role: this.userform.value.role as string,
        status: this.userform.value.status as boolean,
      }
      
      if (this.type === 'role') {
        this.service.UpdateRole(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Role Update');
            this.ClosePopUp();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Role Update')
          }
        })
      }else{
        this.service.UpdateStatus(_obj).subscribe(item => {
          this._response=item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully', 'Status Update');
            this.ClosePopUp();
          } else {
            this.toastr.error('Failed due to : ' + this._response.message, 'Status Update')
          }
        })
      }
    }
  }

  ClosePopUp() {
    this.ref.close();
  }

}
