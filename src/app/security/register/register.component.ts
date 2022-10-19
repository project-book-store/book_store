import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AppUserService} from '../../service/app-user.service';
import {AppUser} from '../../model/app-user';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  appUser: AppUser;
  formGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });

  constructor(private appUserService: AppUserService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.appUser = this.formGroup.value;
    this.appUserService.save(this.appUser).subscribe(value => {
      this.toastr.success('Thêm mới tài khoản thành công!', 'Thông Báo');
      this.router.navigateByUrl('login');
    });
  }
}
