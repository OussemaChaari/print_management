import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document-detail',
    templateUrl: './document-detail.component.html'
})
export class DocumentDetailComponent implements OnInit {
    document: IDocument;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, private documentService: DocumentService) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            this.document = document;
        });
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

    previousState() {
        window.history.back();
    }
}
