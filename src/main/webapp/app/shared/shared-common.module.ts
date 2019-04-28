import { NgModule } from '@angular/core';

import { PrintManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [PrintManagementSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [PrintManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class PrintManagementSharedCommonModule {}
