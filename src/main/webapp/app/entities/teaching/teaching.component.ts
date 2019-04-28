import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITeaching } from 'app/shared/model/teaching.model';
import { AccountService } from 'app/core';
import { TeachingService } from './teaching.service';

@Component({
    selector: 'jhi-teaching',
    templateUrl: './teaching.component.html'
})
export class TeachingComponent implements OnInit, OnDestroy {
    teachings: ITeaching[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected teachingService: TeachingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.teachingService
            .query()
            .pipe(
                filter((res: HttpResponse<ITeaching[]>) => res.ok),
                map((res: HttpResponse<ITeaching[]>) => res.body)
            )
            .subscribe(
                (res: ITeaching[]) => {
                    this.teachings = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTeachings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITeaching) {
        return item.id;
    }

    registerChangeInTeachings() {
        this.eventSubscriber = this.eventManager.subscribe('teachingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
