import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmOtpComponent } from './component/confirm-otp/confirm-otp.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './component/update-password/update-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { UserComponent } from './component/user/user.component';
import { UserRoleComponent } from './component/userrole/userrole.component';
import { UserUpdateComponent } from './component/user-update/user-update.component';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './component/product/product.component';
import { AddproductComponent } from './component/addproduct/addproduct.component';
import { BranchComponent } from './component/branch/branch.component';
import { AddbranchComponent } from './component/addbranch/addbranch.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { UpdateEmployeeComponent } from './component/update-employee/update-employee.component';
import { CardtypeComponent } from './component/cardtype/cardtype.component';
import { AddcardtypeComponent } from './component/addcardtype/addcardtype.component';
import { MembershipcardComponent } from './component/membershipcard/membershipcard.component';
import { AddmembershipcardComponent } from './component/addmembershipcard/addmembershipcard.component';
import { InvoiceComponent } from './component/invoice/invoice.component';

export const routes: Routes = [
    {path:'',component:HomeComponent,canActivate:[authGuard]},
    {path:'register',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'confirm_otp',component:ConfirmOtpComponent},
    {path:'forget_password',component:ForgetPasswordComponent},
    {path:'update_password',component:UpdatePasswordComponent},
    {path:'reset_password',component:ResetPasswordComponent},
    {path:'user_update',component:UserUpdateComponent},
    {path:'User',component:UserComponent,canActivate:[authGuard]},
    {path:'UserRole',component:UserRoleComponent,canActivate:[authGuard]},
    {path:'Product',component:ProductComponent},
    {path:'Product/add',component:AddproductComponent,canActivate:[authGuard]},
    {path:'Product/edit/:id',component:AddproductComponent,canActivate:[authGuard]},
    {path:'Branch',component:BranchComponent},
    {path:'Branch/add',component:AddbranchComponent,canActivate:[authGuard]},
    {path:'Branch/edit/:id',component:AddbranchComponent,canActivate:[authGuard]},
    {path:'Employee',component:EmployeeComponent},
    {path:'employee_update',component:UpdateEmployeeComponent},
    {path:'CardType',component:CardtypeComponent},    
    {path:'CardType/add',component:AddcardtypeComponent,canActivate:[authGuard]},
    {path:'CardType/edit/:id',component:AddcardtypeComponent,canActivate:[authGuard]},
    {path:'MembershipCard',component:MembershipcardComponent},    
    {path:'MembershipCard/add',component:AddmembershipcardComponent,canActivate:[authGuard]},
    {path:'MembershipCard/edit/:id',component:AddmembershipcardComponent,canActivate:[authGuard]},
    {path:'Invoice',component:InvoiceComponent},    
    ];
