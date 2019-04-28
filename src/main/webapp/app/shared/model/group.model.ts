import { ITeaching } from 'app/shared/model/teaching.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IGroup {
    id?: number;
    name?: string;
    studentsNumber?: number;
    teachings?: ITeaching[];
    subjects?: ISubject[];
}

export class Group implements IGroup {
    constructor(
        public id?: number,
        public name?: string,
        public studentsNumber?: number,
        public teachings?: ITeaching[],
        public subjects?: ISubject[]
    ) {}
}
