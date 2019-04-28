import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrintOrder } from 'app/shared/model/print-order.model';

@Component({
    selector: 'jhi-print-order-detail',
    templateUrl: './print-order-detail.component.html'
})
export class PrintOrderDetailComponent implements OnInit {
    printOrder: IPrintOrder;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ printOrder }) => {
            this.printOrder = printOrder;
        });
    }

    previousState() {
        window.history.back();
    }
}
