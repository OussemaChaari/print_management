/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrintManagementTestModule } from '../../../test.module';
import { PrintOrderComponent } from 'app/entities/print-order/print-order.component';
import { PrintOrderService } from 'app/entities/print-order/print-order.service';
import { PrintOrder } from 'app/shared/model/print-order.model';

describe('Component Tests', () => {
    describe('PrintOrder Management Component', () => {
        let comp: PrintOrderComponent;
        let fixture: ComponentFixture<PrintOrderComponent>;
        let service: PrintOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [PrintOrderComponent],
                providers: []
            })
                .overrideTemplate(PrintOrderComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrintOrderComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintOrderService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new PrintOrder(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.printOrders[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
