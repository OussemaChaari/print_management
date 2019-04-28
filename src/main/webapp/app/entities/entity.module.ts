import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'subject',
                loadChildren: './subject/subject.module#PrintManagementSubjectModule'
            },
            {
                path: 'teacher',
                loadChildren: './teacher/teacher.module#PrintManagementTeacherModule'
            },
            {
                path: 'employee',
                loadChildren: './employee/employee.module#PrintManagementEmployeeModule'
            },
            {
                path: 'group',
                loadChildren: './group/group.module#PrintManagementGroupModule'
            },
            {
                path: 'teaching',
                loadChildren: './teaching/teaching.module#PrintManagementTeachingModule'
            },
            {
                path: 'print-order',
                loadChildren: './print-order/print-order.module#PrintManagementPrintOrderModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#PrintManagementDocumentModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintManagementEntityModule {}
