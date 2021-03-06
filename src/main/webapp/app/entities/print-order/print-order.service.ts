import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPrintOrder } from 'app/shared/model/print-order.model';

type EntityResponseType = HttpResponse<IPrintOrder>;
type EntityArrayResponseType = HttpResponse<IPrintOrder[]>;

@Injectable({ providedIn: 'root' })
export class PrintOrderService {
    public resourceUrl = SERVER_API_URL + 'api/print-orders';

    constructor(protected http: HttpClient) {}

    create(printOrder: IPrintOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(printOrder);
        return this.http
            .post<IPrintOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(printOrder: IPrintOrder): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(printOrder);
        return this.http
            .put<IPrintOrder>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IPrintOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IPrintOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(printOrder: IPrintOrder): IPrintOrder {
        const copy: IPrintOrder = Object.assign({}, printOrder, {
            creationDate: printOrder.creationDate != null && printOrder.creationDate.isValid() ? printOrder.creationDate.toJSON() : null,
            recievingDate: printOrder.recievingDate != null && printOrder.recievingDate.isValid() ? printOrder.recievingDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
            res.body.recievingDate = res.body.recievingDate != null ? moment(res.body.recievingDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((printOrder: IPrintOrder) => {
                printOrder.creationDate = printOrder.creationDate != null ? moment(printOrder.creationDate) : null;
                printOrder.recievingDate = printOrder.recievingDate != null ? moment(printOrder.recievingDate) : null;
            });
        }
        return res;
    }
}
