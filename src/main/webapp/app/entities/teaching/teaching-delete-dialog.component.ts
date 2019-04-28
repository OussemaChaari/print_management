import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeaching } from 'app/shared/model/teaching.model';
import { TeachingService } from './teaching.service';

@Component({
    selector: 'jhi-teaching-delete-dialog',
    templateUrl: './teaching-delete-dialog.component.html'
})
export class TeachingDeleteDialogComponent {
    teaching: ITeaching;

    constructor(protected teachingService: TeachingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.teachingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'teachingListModification',
                content: 'Deleted an teaching'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-teaching-delete-popup',
    template: ''
})
export class TeachingDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teaching }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TeachingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.teaching = teaching;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/teaching', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/teaching', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
