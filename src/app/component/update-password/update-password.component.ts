import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UpdatePassword } from '../../models/user.model';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [MaterialModule,RouterLink,ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {
  currentusername = '';

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.currentusername=this.service._username();
  }


  _response: any;

  _resetform = this.builder.group({
    password: this.builder.control('', Validators .required),
    otptext: this.builder.control('', Validators.required)
  })

  ProceedChange() {
    if (this._resetform.valid) {
      let _obj: UpdatePassword = {
        userName: this.currentusername,
        password: this._resetform.value.password as string,
        otpText:this._resetform.value.otptext as string
      }
      console.log(_obj);
      this.service.UpdatePassword(_obj).subscribe(item => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success('Please login with new password', 'Password changed');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Resetpassword Failed')
        }
      });

    }
  }




}
