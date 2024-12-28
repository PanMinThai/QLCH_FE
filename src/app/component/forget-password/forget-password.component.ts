import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  imports: [MaterialModule, FormsModule,RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

  username = ''
  _response: any;

  constructor(private toastr: ToastrService, private router: Router, private service: UserService) {

  }
  ngOnInit(): void {

  }

  Proceed() {
    this.service.ForgetPassword(this.username).subscribe(item => {
      this._response = item;
      if (this._response.result == 'pass') {
        this.toastr.success('OTP sent to the registered email.', 'Forget Password');
        this.service._username.set(this.username);
        this.router.navigateByUrl('/update_password');
      } else {
        this.toastr.error('Failed Due to:' + this._response.message, 'Failed');
      }
    })

  }


}
