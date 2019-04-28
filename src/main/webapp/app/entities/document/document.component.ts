import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { AccountService } from 'app/core';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document',
    templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit, OnDestroy {
    documents: IDocument[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected documentService: DocumentService,
        protected jhiAlertService: JhiAlertService,
        protected dataUtils: JhiDataUtils,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.documentService
            .query()
            .pipe(
                filter((res: HttpResponse<IDocument[]>) => res.ok),
                map((res: HttpResponse<IDocument[]>) => res.body)
            )
            .subscribe(
                (res: IDocument[]) => {
                    this.documents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDocuments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDocument) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
