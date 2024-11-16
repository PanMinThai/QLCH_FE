import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const appRoutes: Routes = [
    { path: '', component: LoginComponent },  // Đặt LoginComponent là route mặc định
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],  // Sửa từ 'routes' thành 'appRoutes'
  exports: [RouterModule]
})
export class AppRoutingModule { }
