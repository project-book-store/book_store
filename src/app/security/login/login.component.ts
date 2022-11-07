import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../service/token-storage.service';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ShareService} from '../../service/share.service';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    formGroup: FormGroup;
    roles: string[] = [];
    username: string;
    returnUrl: string;

    user: SocialUser;

    constructor(private formBuild: FormBuilder,
                private tokenStorageService: TokenStorageService,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private toastr: ToastrService,
                private shareService: ShareService,
                private authServices: SocialAuthService) {
    }

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '';
        this.formGroup = this.formBuild.group({
                username: [''],
                password: [''],
                remember_me: ['']
            }
        );

        if (this.tokenStorageService.getToken()) {
            if (this.tokenStorageService.getUser().username !== undefined) {
                this.authService.isLoggedIn = true;
                this.roles = this.tokenStorageService.getUser().roles;
                this.username = this.tokenStorageService.getUser().username;
            }
            if (this.tokenStorageService.getUser().username === undefined) {
                this.authService.isLoggedIn = true;
                this.username = this.tokenStorageService.getUser().name;
                this.roles = ['ROLE_USER'];
            }
        }
    }

    onSubmit() {
        this.authService.login(this.formGroup.value).subscribe(data => {
            if (this.formGroup.value.remember_me === true) {
                this.tokenStorageService.saveTokenLocal(data.token);
                this.tokenStorageService.saveUserLocal(data);
            } else {
                this.tokenStorageService.saveTokenSession(data.token);
                this.tokenStorageService.saveUserSession(data);
            }

            this.authService.isLoggedIn = true;
            this.username = this.tokenStorageService.getUser().username;
            this.roles = this.tokenStorageService.getUser().roles;
            this.formGroup.reset();
            this.router.navigateByUrl(this.returnUrl);
            this.toastr.success('Đăng nhập thành công', 'Đăng nhập: ', {
                timeOut: 3000,
                extendedTimeOut: 1500
            });
            this.shareService.sendClickEvent();
        }, err => {
            this.authService.isLoggedIn = false;
            this.toastr.error('Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt', 'Đăng nhập thất bại: ', {
                timeOut: 3000,
                extendedTimeOut: 1500
            });
        });
    }

    signInWithFB(): void {
        this.authServices.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.authServices.authState.subscribe((user) => {
            this.user = user;
            if (this.formGroup.value.remember_me === true) {
                this.tokenStorageService.saveTokenLocal(this.user.authToken);
                this.tokenStorageService.saveUserLocal(this.user);
            } else {
                this.tokenStorageService.saveTokenSession(this.user.authToken);
                this.tokenStorageService.saveUserSession(this.user);
            }
            this.authService.isLoggedIn = true;
            this.username = this.user.name;
            this.roles = ['ROLE_USER'];
            this.router.navigateByUrl('/');
            this.toastr.success('Đăng nhập thành công', 'Đăng nhập: ', {
                timeOut: 2000,
                extendedTimeOut: 1500
            });
        }, err => {
            this.authService.isLoggedIn = false;
            this.toastr.error('Đăng nhập thất bại', 'Đăng nhập thất bại: ', {
                timeOut: 2000,
                extendedTimeOut: 1500
            });
        });
    }

    signOut(): void {
        this.authServices.signOut();
    }
}
