import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrintManagementSharedModule } from 'app/shared';
import {
    PrintOrderComponent,
    PrintOrderDetailComponent,
    PrintOrderUpdateComponent,
    PrintOrderDeletePopupComponent,
    PrintOrderDeleteDialogComponent,
    printOrderRoute,
    printOrderPopupRoute
} from './';

const ENTITY_STATES = [...printOrderRoute, ...printOrderPopupRoute];

@NgModule({
    imports: [PrintManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrintOrderComponent,
        PrintOrderDetailComponent,
        PrintOrderUpdateComponent,
        PrintOrderDeleteDialogComponent,
        PrintOrderDeletePopupComponent
    ],
    entryComponents: [PrintOrderComponent, PrintOrderUpdateComponent, PrintOrderDeleteDialogComponent, PrintOrderDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintManagementPrintOrderModule {}
