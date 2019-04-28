import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrintOrder } from 'app/shared/model/print-order.model';
import { PrintOrderService } from './print-order.service';
import { PrintOrderComponent } from './print-order.component';
import { PrintOrderDetailComponent } from './print-order-detail.component';
import { PrintOrderUpdateComponent } from './print-order-update.component';
import { PrintOrderDeletePopupComponent } from './print-order-delete-dialog.component';
import { IPrintOrder } from 'app/shared/model/print-order.model';

@Injectable({ providedIn: 'root' })
export class PrintOrderResolve implements Resolve<IPrintOrder> {
    constructor(private service: PrintOrderService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrintOrder> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<PrintOrder>) => response.ok),
                map((printOrder: HttpResponse<PrintOrder>) => printOrder.body)
            );
        }
        return of(new PrintOrder());
    }
}

export const printOrderRoute: Routes = [
    {
        path: '',
        component: PrintOrderComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: PrintOrderDetailComponent,
        resolve: {
            printOrder: PrintOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: PrintOrderUpdateComponent,
        resolve: {
            printOrder: PrintOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintOrders'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: PrintOrderUpdateComponent,
        resolve: {
            printOrder: PrintOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintOrders'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const printOrderPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: PrintOrderDeletePopupComponent,
        resolve: {
            printOrder: PrintOrderResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintOrders'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
