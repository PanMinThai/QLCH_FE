import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { LoginResp, Menu, MenuPermission, Menus, RegisterConfirm, ResetPassword, Roles, UpdatePassword, UpdateUser, UserCred, UserRegister, Users } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _registerresp = signal<RegisterConfirm>({
    userid: 0,
    userName: '',
    otptext: ''
  })

  _username=signal('');

  _menulist = signal<Menu[]>([]);

  UserRegisteration(_data: UserRegister) {
    return this.http.post(this.baseUrl + 'User/UserRegisteration', _data);
  }

  ConfirmRegisteration(_data: RegisterConfirm) {
    return this.http.post(this.baseUrl + 'User/ConfirmRegisteration', _data);
  }

  ProceedLogin(_data: UserCred) {
    return this.http.post<LoginResp>(this.baseUrl + 'Authorize/GenerateToken', _data);
  }

  // LoadMenuByRole() {
  //   return this.http.get<Menu[]>(this.bas  eUrl + 'UserRole/GetAllMenusByRole');
  // }
  LoadMenuByRole() {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Menu[]>(this.baseUrl + 'UserRole/GetAllMenusByRole', { headers });
  }

  ResetPassword(_data: ResetPassword) {
    return this.http.post(this.baseUrl + 'User/ResetPassword', _data);
  }

  ForgetPassword(username: string) {
    return this.http.get(this.baseUrl + 'User/ForgetPassword?username=' + username)
  }

  UpdatePassword(_data: UpdatePassword) {
    return this.http.post(this.baseUrl + 'User/UpdatePassword', _data);
  }

  GetMenuPermission(roleId:string,menuname:string){
    return this.http.get<MenuPermission>(this.baseUrl + 'UserRole/GetMenuPermissionByRole?RoleId='+roleId+'&MenuCode=' + menuname)
  }

  GetRoleIdByRoleName(name:string){
    return this.http.get<string>(this.baseUrl + 'UserRole/GetRoleIdByName?rolename='+name)
  }
  GetAllUsers() {
    return this.http.get<Users[]>(this.baseUrl + 'User/GetAll');
  }

  GetUserById(id:string) {
    return this.http.get<Users>(this.baseUrl + 'User/GetUserById?Id='+id);
  }

  GetAllRoles() {
    return this.http.get<Roles[]>(this.baseUrl + 'UserRole/GetAllRoles');
  }

  UpdateRole(_data: UpdateUser) {
    return this.http.post(this.baseUrl + 'User/UpdateRole', _data);
  }
  UpdateStatus(_data: UpdateUser) {
    return this.http.post(this.baseUrl + 'User/UpdateStatus', _data);
  }

  GetAllMenus() {
    return this.http.get<Menus[]>(this.baseUrl + 'UserRole/GetAllMenus');
  }

  AssignRolePermission(_data:MenuPermission[]){
    return this.http.post(this.baseUrl + 'UserRole/AssignRolePermission', _data);
  }
}
