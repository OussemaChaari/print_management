import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#PrintManagementAdminModule'
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: false }
        )
    ],
    exports: [RouterModule]
})
export class PrintManagementAppRoutingModule {}
