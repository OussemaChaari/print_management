import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService, IUser } from 'app/core';
import { IEmployee } from 'app/shared/model/employee.model';
import { IPrintOrder } from 'app/shared/model/print-order.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeService } from '../employee';
import { PrintOrderService } from './print-order.service';

@Component({
    selector: 'jhi-print-order',
    templateUrl: './print-order.component.html',
    styles: [`
      `]
})
export class PrintOrderComponent implements OnInit, OnDestroy {
    printOrders: IPrintOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;
    user;
    employeeId: number;
    employee: ITeacher;
    constructor(
        protected printOrderService: PrintOrderService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        private employeeService: EmployeeService
    ) {
        this.accountService.identity().then(user => { console.log(user); this.user = user });
    }

    setPrintOrderState(id, status) {
        this.printOrderService.updateStatus(id, status).subscribe(res => {
            this.ngOnInit();
        });
    }

    loadAll() {
        this.printOrderService
            .query()
            .pipe(
                filter((res: HttpResponse<IPrintOrder[]>) => res.ok),
                map((res: HttpResponse<IPrintOrder[]>) => res.body)
            )
            .subscribe(
                (res: IPrintOrder[]) => {
                    this.printOrders = res;
                    console.log(this.printOrders);
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    claimPrintOrder(id) {
        this.printOrderService.claimPrintOrder(id, this.employee.id).subscribe(res => {
            this.ngOnInit();
        });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then((user: IUser) => {
            if (user.authorities.includes('ROLE_EMPLOYEE')) {
                this.employeeService.findByUserId(user.id).subscribe((employee: IEmployee) => {
                    this.employeeId = employee.id;
                    this.employee = employee;
                });
            }
        });
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInPrintOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IPrintOrder) {
        return item.id;
    }

    registerChangeInPrintOrders() {
        this.eventSubscriber = this.eventManager.subscribe('printOrderListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
