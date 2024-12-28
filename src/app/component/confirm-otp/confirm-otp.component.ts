import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { RegisterConfirm } from '../../models/user.model';
@Component({
  selector: 'app-confirm-otp',
  standalone: true,
  imports: [FormsModule, MaterialModule,RouterLink],
  templateUrl: './confirm-otp.component.html',
  styleUrl: './confirm-otp.component.css'
})
export class ConfirmOtpComponent implements OnInit {

  otptext = ''
  regresponse!: RegisterConfirm;
  _response: any;

  constructor(private toastr: ToastrService, private router: Router, private service: UserService) {

  }
  ngOnInit(): void {
    this.regresponse = this.service._registerresp();
  }

  ConfirmOTP() {

    this.regresponse.otptext = this.otptext;
    this.service.ConfirmRegisteration(this.regresponse).subscribe(item => {
      this._response = item;
      console.log(item);
      
      if (this._response.result == 'pass') {
           this.toastr.success('Registeration completed successfully.','Success');
           this.service._registerresp.set({
             userid: 0,
             userName: '',
             otptext: ''
           })
           this.router.navigateByUrl('/login');
      }else{
        this.toastr.error('Failed Due to:' + this._response.message,'Registeration Failed');
      }
    })

  }

}
