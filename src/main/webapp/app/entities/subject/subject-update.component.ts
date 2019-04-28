import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from './subject.service';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from 'app/entities/group';

@Component({
    selector: 'jhi-subject-update',
    templateUrl: './subject-update.component.html'
})
export class SubjectUpdateComponent implements OnInit {
    subject: ISubject;
    isSaving: boolean;

    groups: IGroup[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected subjectService: SubjectService,
        protected groupService: GroupService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ subject }) => {
            this.subject = subject;
        });
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
        if (this.subject.id !== undefined) {
            this.subscribeToSaveResponse(this.subjectService.update(this.subject));
        } else {
            this.subscribeToSaveResponse(this.subjectService.create(this.subject));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>) {
        result.subscribe((res: HttpResponse<ISubject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackGroupById(index: number, item: IGroup) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
