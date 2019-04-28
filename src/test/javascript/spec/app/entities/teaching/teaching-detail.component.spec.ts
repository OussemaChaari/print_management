/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PrintManagementTestModule } from '../../../test.module';
import { TeachingDetailComponent } from 'app/entities/teaching/teaching-detail.component';
import { Teaching } from 'app/shared/model/teaching.model';

describe('Component Tests', () => {
    describe('Teaching Management Detail Component', () => {
        let comp: TeachingDetailComponent;
        let fixture: ComponentFixture<TeachingDetailComponent>;
        const route = ({ data: of({ teaching: new Teaching(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [PrintManagementTestModule],
                declarations: [TeachingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TeachingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TeachingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.teaching).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
