import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeaching } from 'app/shared/model/teaching.model';
import { TeachingService } from './teaching.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from 'app/entities/teacher';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group';

@Component({
    selector: 'jhi-teaching-update',
    templateUrl: './teaching-update.component.html'
})
export class TeachingUpdateComponent implements OnInit {
    teaching: ITeaching;
    isSaving: boolean;

    subjects: ISubject[];

    teachers: ITeacher[];

    groups: IGroup[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected teachingService: TeachingService,
        protected subjectService: SubjectService,
        protected teacherService: TeacherService,
        protected groupService: GroupService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teaching }) => {
            this.teaching = teaching;
        });
        this.subjectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISubject[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubject[]>) => response.body)
            )
            .subscribe((res: ISubject[]) => (this.subjects = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.teacherService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeacher[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeacher[]>) => response.body)
            )
            .subscribe((res: ITeacher[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.groupService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IGroup[]>) => mayBeOk.ok),
                map((response: HttpResponse<IGroup[]>) => response.body)
            )
            .subscribe((res: IGroup[]) => (this.groups = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teaching.id !== undefined) {
            this.subscribeToSaveResponse(this.teachingService.update(this.teaching));
        } else {
            this.subscribeToSaveResponse(this.teachingService.create(this.teaching));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeaching>>) {
        result.subscribe((res: HttpResponse<ITeaching>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSubjectById(index: number, item: ISubject) {
        return item.id;
    }

    trackTeacherById(index: number, item: ITeacher) {
        return item.id;
    }

    trackGroupById(index: number, item: IGroup) {
        return item.id;
    }
}
