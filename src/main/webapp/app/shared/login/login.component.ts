import { AfterViewInit, Component, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { StateStorageService } from 'app/core/auth/state-storage.service';
import { LoginService } from 'app/core/login/login.service';
import { JhiEventManager } from 'ng-jhipster';
import { AccountService } from 'app/core';

@Component({
    selector: 'jhi-login-modal',
    templateUrl: './login.component.html'
})
export class JhiLoginModalComponent implements AfterViewInit {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    userData: AccountService;
    account: any;
    customError: any;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private accountService: AccountService
    ) {
        this.credentials = {};
    }

    ngAfterViewInit() {
        setTimeout(() => this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []), 0);
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                this.accountService.identity().then(acc => {
                    this.account = acc;
                    this.redirect();
                });
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(err => {
                if (err.error.detail) {
                    this.customError = err.error.detail;
                } else {
                    this.authenticationError = true;
                }
            });
    }

    redirect() {
        this.account.authorities.forEach(role => {
            if (role === 'ROLE_ADMIN') {
                this.router.navigate(['/admin/user-management']);
            } else if (role === 'ROLE_TEACHER' || role === 'ROLE_EMPLOYEE') {
                this.router.navigate(['/print-order']);
            }
        });
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }
}
