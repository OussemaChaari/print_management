/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrintManagementTestModule } from '../../../test.module';
import { PrintOrderDetailComponent } from 'app/entities/print-order/print-order-detail.component';
import { PrintOrder } from 'app/shared/model/print-order.model';

describe('Component Tests', () => {
    describe('PrintOrder Management Detail Component', () => {
        let comp: PrintOrderDetailComponent;
        let fixture: ComponentFixture<PrintOrderDetailComponent>;
        const route = ({ data: of({ printOrder: new PrintOrder(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [PrintOrderDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PrintOrderDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrintOrderDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.printOrder).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
