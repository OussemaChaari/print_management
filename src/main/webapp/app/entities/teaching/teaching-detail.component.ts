import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeaching } from 'app/shared/model/teaching.model';

@Component({
    selector: 'jhi-teaching-detail',
    templateUrl: './teaching-detail.component.html'
})
export class TeachingDetailComponent implements OnInit {
    teaching: ITeaching;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ teaching }) => {
            this.teaching = teaching;
        });
    }

    previousState() {
        window.history.back();
    }
}
