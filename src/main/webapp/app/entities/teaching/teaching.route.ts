import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Teaching } from 'app/shared/model/teaching.model';
import { TeachingService } from './teaching.service';
import { TeachingComponent } from './teaching.component';
import { TeachingDetailComponent } from './teaching-detail.component';
import { TeachingUpdateComponent } from './teaching-update.component';
import { TeachingDeletePopupComponent } from './teaching-delete-dialog.component';
import { ITeaching } from 'app/shared/model/teaching.model';

@Injectable({ providedIn: 'root' })
export class TeachingResolve implements Resolve<ITeaching> {
    constructor(private service: TeachingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeaching> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Teaching>) => response.ok),
                map((teaching: HttpResponse<Teaching>) => teaching.body)
            );
        }
        return of(new Teaching());
    }
}

export const teachingRoute: Routes = [
    {
        path: '',
        component: TeachingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TeachingDetailComponent,
        resolve: {
            teaching: TeachingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TeachingUpdateComponent,
        resolve: {
            teaching: TeachingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachings'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TeachingUpdateComponent,
        resolve: {
            teaching: TeachingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const teachingPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TeachingDeletePopupComponent,
        resolve: {
            teaching: TeachingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Teachings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
