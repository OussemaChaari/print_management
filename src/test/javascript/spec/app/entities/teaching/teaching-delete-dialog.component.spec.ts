/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { PrintManagementTestModule } from '../../../test.module';
import { TeachingDeleteDialogComponent } from 'app/entities/teaching/teaching-delete-dialog.component';
import { TeachingService } from 'app/entities/teaching/teaching.service';

describe('Component Tests', () => {
    describe('Teaching Management Delete Component', () => {
        let comp: TeachingDeleteDialogComponent;
        let fixture: ComponentFixture<TeachingDeleteDialogComponent>;
        let service: TeachingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [TeachingDeleteDialogComponent]
            })
                .overrideTemplate(TeachingDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingService);
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
