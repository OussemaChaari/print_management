import { Moment } from 'moment';
import { IDocument } from 'app/shared/model/document.model';
import { ITeaching } from 'app/shared/model/teaching.model';
import { IEmployee } from 'app/shared/model/employee.model';

export const enum Status {
    INPROGRESS = 'INPROGRESS',
    PENDING = 'PENDING',
    DONE = 'DONE'
}

export interface IPrintOrder {
    id?: number;
    creationDate?: Moment;
    recievingDate?: Moment;
    status?: Status;
    document?: IDocument;
    teaching?: ITeaching;
    employee?: IEmployee;
}

export class PrintOrder implements IPrintOrder {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public recievingDate?: Moment,
        public status?: Status,
        public document?: IDocument,
        public teaching?: ITeaching,
        public employee?: IEmployee
    ) {}
}
