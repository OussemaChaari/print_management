import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintManagementSharedModule } from 'app/shared';
import {
    TeachingComponent,
    TeachingDetailComponent,
    TeachingUpdateComponent,
    TeachingDeletePopupComponent,
    TeachingDeleteDialogComponent,
    teachingRoute,
    teachingPopupRoute
} from './';

const ENTITY_STATES = [...teachingRoute, ...teachingPopupRoute];

@NgModule({
    imports: [PrintManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeachingComponent,
        TeachingDetailComponent,
        TeachingUpdateComponent,
        TeachingDeleteDialogComponent,
        TeachingDeletePopupComponent
    ],
    entryComponents: [TeachingComponent, TeachingUpdateComponent, TeachingDeleteDialogComponent, TeachingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintManagementTeachingModule {}
