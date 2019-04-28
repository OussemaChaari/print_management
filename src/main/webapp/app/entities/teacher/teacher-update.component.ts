import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeacher } from 'app/shared/model/teacher.model';
import { TeacherService } from './teacher.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-teacher-update',
    templateUrl: './teacher-update.component.html'
})
export class TeacherUpdateComponent implements OnInit {
    teacher: ITeacher;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected teacherService: TeacherService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ teacher }) => {
            this.teacher = teacher;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.teacher.id !== undefined) {
            this.subscribeToSaveResponse(this.teacherService.update(this.teacher));
        } else {
            this.subscribeToSaveResponse(this.teacherService.create(this.teacher));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacher>>) {
        result.subscribe((res: HttpResponse<ITeacher>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
