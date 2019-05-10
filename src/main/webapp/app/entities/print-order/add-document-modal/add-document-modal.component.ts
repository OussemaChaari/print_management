import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentService } from 'app/entities/document';
import { IDocument } from 'app/shared/model/document.model';
import { JhiDataUtils } from 'ng-jhipster';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'jhi-add-document-modal',
    templateUrl: './add-document-modal.component.html',
    styles: [],
})
export class AddDocumentModalComponent implements OnInit {

    document: IDocument;
    isSaving: boolean;
    result: Subject<any> = new Subject();
    success = false;

    constructor(public activeModal: NgbActiveModal, protected dataUtils: JhiDataUtils, protected documentService: DocumentService, protected activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isSaving = false;
        this.document = {};
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile() {
        this.documentService.getFile(this.document.id).subscribe((res: any) => {
            console.log(res);
            const file = new Blob([res], { type: 'application/pdf' });
            const downloadURL = window.URL.createObjectURL(file);
            window.open(downloadURL);
        });
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.documentService.create(this.document));
        this.result.next('success');
        this.activeModal.close();
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.success = true;
    }

    protected onSaveError() {
        this.isSaving = false;
    }

}
