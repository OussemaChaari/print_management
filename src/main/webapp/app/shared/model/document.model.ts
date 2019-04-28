export interface IDocument {
    id?: number;
    title?: string;
    fileContentType?: string;
    file?: any;
}

export class Document implements IDocument {
    constructor(public id?: number, public title?: string, public fileContentType?: string, public file?: any) {}
}
