import { IUser } from 'app/core/user/user.model';
import { ITeaching } from 'app/shared/model/teaching.model';

export interface ITeacher {
    id?: number;
    orderedPrints?: number;
    user?: IUser;
    teachings?: ITeaching[];
}

export class Teacher implements ITeacher {
    constructor(public id?: number, public orderedPrints?: number, public user?: IUser, public teachings?: ITeaching[]) {}
}
