import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrintManagementSharedModule } from 'app/shared';
import { HomeComponent, HOME_ROUTE } from './';
import { RegisterComponent } from './register/register.component';

@NgModule({
    imports: [PrintManagementSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [HomeComponent, RegisterComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintManagementHomeModule { }
