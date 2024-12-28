import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { ResetPassword } from '../../models/user.model';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
  }

  _response: any;

  _resetform = this.builder.group({
   // username: this.builder.control('', Validators.required),
    OldPassword: this.builder.control('', Validators.required),
    NewPassword: this.builder.control('', Validators.required)
  })

  ProceedChange() {
    if (this._resetform.valid) {
      let _obj: ResetPassword = {
        userName: localStorage.getItem('userName') as string,
        oldPassword: this._resetform.value.OldPassword as string,
        newPassword:this._resetform.value.NewPassword as string
      }
      this.service.ResetPassword(_obj).subscribe(item => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success('Please login with new password', 'Password changed');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'ResetPassword Failed')
        }
      });

    }
  }

}