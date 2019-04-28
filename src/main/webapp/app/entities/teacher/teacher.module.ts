import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintManagementSharedModule } from 'app/shared';
import {
    TeacherComponent,
    TeacherDetailComponent,
    TeacherUpdateComponent,
    TeacherDeletePopupComponent,
    TeacherDeleteDialogComponent,
    teacherRoute,
    teacherPopupRoute
} from './';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
    imports: [PrintManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TeacherComponent,
        TeacherDetailComponent,
        TeacherUpdateComponent,
        TeacherDeleteDialogComponent,
        TeacherDeletePopupComponent
    ],
    entryComponents: [TeacherComponent, TeacherUpdateComponent, TeacherDeleteDialogComponent, TeacherDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintManagementTeacherModule {}
