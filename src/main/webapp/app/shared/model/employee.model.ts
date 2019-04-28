import { IUser } from 'app/core/user/user.model';
import { IPrintOrder } from 'app/shared/model/print-order.model';

export interface IEmployee {
    id?: number;
    printsNumber?: number;
    user?: IUser;
    printOrders?: IPrintOrder[];
}

export class Employee implements IEmployee {
    constructor(public id?: number, public printsNumber?: number, public user?: IUser, public printOrders?: IPrintOrder[]) {}
}
