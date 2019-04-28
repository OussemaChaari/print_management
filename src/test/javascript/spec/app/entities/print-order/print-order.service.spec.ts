/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PrintOrderService } from 'app/entities/print-order/print-order.service';
import { IPrintOrder, PrintOrder, Status } from 'app/shared/model/print-order.model';

describe('Service Tests', () => {
    describe('PrintOrder Service', () => {
        let injector: TestBed;
        let service: PrintOrderService;
        let httpMock: HttpTestingController;
        let elemDefault: IPrintOrder;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PrintOrderService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PrintOrder(0, currentDate, currentDate, Status.INPROGRESS);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        recievingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a PrintOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        recievingDate: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        recievingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PrintOrder(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PrintOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        recievingDate: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        recievingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of PrintOrder', async () => {
                const returnedFromService = Object.assign(
                    {
                        creationDate: currentDate.format(DATE_TIME_FORMAT),
                        recievingDate: currentDate.format(DATE_TIME_FORMAT),
                        status: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        creationDate: currentDate,
                        recievingDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a PrintOrder', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
