import { ITeaching } from 'app/shared/model/teaching.model';
import { IGroup } from 'app/shared/model/group.model';

export interface ISubject {
    id?: number;
    name?: string;
    teachings?: ITeaching[];
    groups?: IGroup[];
}

export class Subject implements ISubject {
    constructor(public id?: number, public name?: string, public teachings?: ITeaching[], public groups?: IGroup[]) {}
}
