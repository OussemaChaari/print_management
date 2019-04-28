import { IPrintOrder } from 'app/shared/model/print-order.model';
import { ISubject } from 'app/shared/model/subject.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { IGroup } from 'app/shared/model/group.model';

export interface ITeaching {
    id?: number;
    printOrders?: IPrintOrder[];
    subject?: ISubject;
    teacher?: ITeacher;
    group?: IGroup;
}

export class Teaching implements ITeaching {
    constructor(
        public id?: number,
        public printOrders?: IPrintOrder[],
        public subject?: ISubject,
        public teacher?: ITeacher,
        public group?: IGroup
    ) {}
}
