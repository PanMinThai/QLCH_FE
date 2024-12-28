import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { LoginResp, UserCred } from '../../models/user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    localStorage.clear();
    this.service._menulist.set([]);

  }

  _response!: LoginResp;

  _loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin() {

    if (this._loginform.valid) {
      let _obj: UserCred = {
        userName: this._loginform.value.username as string,
        password: this._loginform.value.password as string
      }
      this.service.ProceedLogin(_obj).subscribe(item => {
        this._response = item;
        localStorage.setItem('token', this._response.token);
        localStorage.setItem('userName', _obj.userName);
        localStorage.setItem('userRole', this._response.userRole);
        
        
        //console.log(this._response.UserRole);
        
        this.service.LoadMenuByRole().subscribe(item=>{
          this.service._menulist.set(item);
        })
        this.router.navigateByUrl('/'); 
      }, error => {
        this.toastr.error('Failed to login', error.error.title)
      });
    }

  }

}

