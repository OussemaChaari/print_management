import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrintOrder } from 'app/shared/model/print-order.model';
import { AccountService } from 'app/core';
import { PrintOrderService } from './print-order.service';

@Component({
    selector: 'jhi-print-order',
    templateUrl: './print-order.component.html'
})
export class PrintOrderComponent implements OnInit, OnDestroy {
    printOrders: IPrintOrder[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected printOrderService: PrintOrderService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

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
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
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
