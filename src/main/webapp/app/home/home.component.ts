import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private router: Router
    ) { }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
            this.redirect();
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    redirect() {
        if (this.account) {
            this.account.authorities.forEach(role => {
                if (role === 'ROLE_ADMIN') {
                    this.router.navigate(['/admin/user-management']);
                } else if (role === 'ROLE_TEACHER' || role === 'ROLE_EMPLOYEE') {
                    this.router.navigate(['/print-order']);
                }
            });
        }
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
