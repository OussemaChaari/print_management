import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPrintOrder } from 'app/shared/model/print-order.model';
import { PrintOrderService } from './print-order.service';
import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document';
import { ITeaching } from 'app/shared/model/teaching.model';
import { TeachingService } from 'app/entities/teaching';
import { IEmployee } from 'app/shared/model/employee.model';
import { EmployeeService } from 'app/entities/employee';

@Component({
    selector: 'jhi-print-order-update',
    templateUrl: './print-order-update.component.html'
})
export class PrintOrderUpdateComponent implements OnInit {
    printOrder: IPrintOrder;
    isSaving: boolean;

    documents: IDocument[];

    teachings: ITeaching[];

    employees: IEmployee[];
    creationDate: string;
    recievingDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected printOrderService: PrintOrderService,
        protected documentService: DocumentService,
        protected teachingService: TeachingService,
        protected employeeService: EmployeeService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ printOrder }) => {
            this.printOrder = printOrder;
            this.creationDate = this.printOrder.creationDate != null ? this.printOrder.creationDate.format(DATE_TIME_FORMAT) : null;
            this.recievingDate = this.printOrder.recievingDate != null ? this.printOrder.recievingDate.format(DATE_TIME_FORMAT) : null;
        });
        this.documentService
            .query({ filter: 'printorder-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IDocument[]>) => mayBeOk.ok),
                map((response: HttpResponse<IDocument[]>) => response.body)
            )
            .subscribe(
                (res: IDocument[]) => {
                    if (!this.printOrder.document || !this.printOrder.document.id) {
                        this.documents = res;
                    } else {
                        this.documentService
                            .find(this.printOrder.document.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IDocument>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IDocument>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IDocument) => (this.documents = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.teachingService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeaching[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeaching[]>) => response.body)
            )
            .subscribe((res: ITeaching[]) => (this.teachings = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.employeeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
                map((response: HttpResponse<IEmployee[]>) => response.body)
            )
            .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.printOrder.creationDate = this.creationDate != null ? moment(this.creationDate, DATE_TIME_FORMAT) : null;
        this.printOrder.recievingDate = this.recievingDate != null ? moment(this.recievingDate, DATE_TIME_FORMAT) : null;
        if (this.printOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.printOrderService.update(this.printOrder));
        } else {
            this.subscribeToSaveResponse(this.printOrderService.create(this.printOrder));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrintOrder>>) {
        result.subscribe((res: HttpResponse<IPrintOrder>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackDocumentById(index: number, item: IDocument) {
        return item.id;
    }

    trackTeachingById(index: number, item: ITeaching) {
        return item.id;
    }

    trackEmployeeById(index: number, item: IEmployee) {
        return item.id;
    }
}
