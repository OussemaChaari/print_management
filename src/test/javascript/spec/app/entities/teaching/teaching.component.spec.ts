/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PrintManagementTestModule } from '../../../test.module';
import { TeachingComponent } from 'app/entities/teaching/teaching.component';
import { TeachingService } from 'app/entities/teaching/teaching.service';
import { Teaching } from 'app/shared/model/teaching.model';

describe('Component Tests', () => {
    describe('Teaching Management Component', () => {
        let comp: TeachingComponent;
        let fixture: ComponentFixture<TeachingComponent>;
        let service: TeachingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [TeachingComponent],
                providers: []
            })
                .overrideTemplate(TeachingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TeachingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeachingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Teaching(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.teachings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
