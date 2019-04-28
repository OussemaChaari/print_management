/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { PrintManagementTestModule } from '../../../test.module';
import { PrintOrderUpdateComponent } from 'app/entities/print-order/print-order-update.component';
import { PrintOrderService } from 'app/entities/print-order/print-order.service';
import { PrintOrder } from 'app/shared/model/print-order.model';

describe('Component Tests', () => {
    describe('PrintOrder Management Update Component', () => {
        let comp: PrintOrderUpdateComponent;
        let fixture: ComponentFixture<PrintOrderUpdateComponent>;
        let service: PrintOrderService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [PrintOrderUpdateComponent]
            })
                .overrideTemplate(PrintOrderUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(PrintOrderUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintOrderService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrintOrder(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.printOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new PrintOrder();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.printOrder = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
