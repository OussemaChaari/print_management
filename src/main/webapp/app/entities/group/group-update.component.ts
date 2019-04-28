import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGroup } from 'app/shared/model/group.model';
import { GroupService } from './group.service';
import { ISubject } from 'app/shared/model/subject.model';
import { SubjectService } from 'app/entities/subject';

@Component({
    selector: 'jhi-group-update',
    templateUrl: './group-update.component.html',
    styles: [`
        .chip{
            display: inline-block;
            padding: 5px 10px;
            margin: 5px;
        }
    `]
})
export class GroupUpdateComponent implements OnInit {
    group: IGroup;
    isSaving: boolean;

    subjects: ISubject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected groupService: GroupService,
        protected subjectService: SubjectService,
        protected activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ group }) => {
            this.group = group;
        });
        this.subjectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISubject[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISubject[]>) => response.body)
            )
            .subscribe((res: ISubject[]) => { this.subjects = res; console.log('subjects', res); }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.group.id !== undefined) {
            this.subscribeToSaveResponse(this.groupService.update(this.group));
        } else {
            this.subscribeToSaveResponse(this.groupService.create(this.group));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroup>>) {
        result.subscribe((res: HttpResponse<IGroup>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
