/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrintManagementTestModule } from '../../../test.module';
import { PrintOrderDeleteDialogComponent } from 'app/entities/print-order/print-order-delete-dialog.component';
import { PrintOrderService } from 'app/entities/print-order/print-order.service';

describe('Component Tests', () => {
    describe('PrintOrder Management Delete Component', () => {
        let comp: PrintOrderDeleteDialogComponent;
        let fixture: ComponentFixture<PrintOrderDeleteDialogComponent>;
        let service: PrintOrderService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [PrintOrderDeleteDialogComponent]
            })
                .overrideTemplate(PrintOrderDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PrintOrderDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PrintOrderService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
