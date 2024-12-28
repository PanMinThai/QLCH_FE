import { Component, OnInit } from '@angular/core';
import { MenuPermission, Menus, Roles } from '../../models/user.model';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userrole',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './userrole.component.html',
  styleUrl: './userrole.component.css'
})
export class UserRoleComponent implements OnInit {

  RoleList!: Roles[];
  MenuList!: Menus[];
  AccessArray!: FormArray<any>;
  UserAccess!: MenuPermission
  _response:any;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: UserService) {

  }
  ngOnInit(): void {
    this.LoadRoles();
    this.LoadMenus('');
  }

    RoleForm = this.builder.group({
    UserRole: this.builder.control('', Validators.required),
    Access: this.builder.array([])
  })

  GenerateMenuRow(input: Menus,_access: MenuPermission,roleId:string) {
    return this.builder.group({
      id :this.builder.control(_access.id),
      menuCode: this.builder.control(input.menuCode),
      HaveView: this.builder.control(_access.haveView),
      HaveAdd: this.builder.control(_access.haveAdd),
      HaveEdit: this.builder.control(_access.haveEdit),
      HaveDelete: this.builder.control(_access.haveDelete),
      roleId:this.builder.control(roleId)
    })
  }
  AddNewRow(input: Menus, _access: MenuPermission,roleId:string) {
    this.AccessArray.push(this.GenerateMenuRow(input,_access,roleId))
  }

  get getrows() {
    return this.RoleForm.get('Access') as FormArray;
  }

  LoadRoles() {
    this.service.GetAllRoles().subscribe(item => {
      this.RoleList = item;
    })
  }

  LoadMenus(roleId: string) {
    this.AccessArray = this.RoleForm.get('Access') as FormArray;
    this.AccessArray.clear();
    this.service.GetAllMenus().subscribe(item => {
      this.MenuList = item;
      
      if (this.MenuList.length > 0) {

        this.MenuList.map((o: Menus) => {

          if (roleId != '') {
            this.service.GetMenuPermission(roleId, o.menuCode).subscribe(item => {
              this.UserAccess = item;
              this.AddNewRow(o, this.UserAccess,roleId);
            })
          } else {
            this.AddNewRow(o, {
              id: '',
              menuCode: '',
              haveView: false,
              haveAdd: false,
              haveEdit: false,
              haveDelete: false,
              roleId: '',
            },'');
          }
        })
      }
    })
  }

  RoleChange(event: any) {
    let selectedRole = event.value;
    this.LoadMenus(selectedRole)

  }

  SaveRoles() {
  //  console.log(this.RoleForm);
    if(this.RoleForm.valid){
      let formarry=this.RoleForm.value.Access as MenuPermission[]
      this.service.AssignRolePermission(formarry).subscribe(item=>{
        this._response=item;
        if (this._response.result == 'pass') {
          this.toastr.success('Permission assigned successfully', 'Saved');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Menu access assignment')
        }
      })
    }

  }

}
