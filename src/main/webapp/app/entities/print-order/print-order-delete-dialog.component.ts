import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrintOrder } from 'app/shared/model/print-order.model';
import { PrintOrderService } from './print-order.service';

@Component({
    selector: 'jhi-print-order-delete-dialog',
    templateUrl: './print-order-delete-dialog.component.html'
})
export class PrintOrderDeleteDialogComponent {
    printOrder: IPrintOrder;

    constructor(
        protected printOrderService: PrintOrderService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.printOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'printOrderListModification',
                content: 'Deleted an printOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-print-order-delete-popup',
    template: ''
})
export class PrintOrderDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ printOrder }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PrintOrderDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.printOrder = printOrder;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/print-order', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/print-order', { outlets: { popup: null } }]);
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
