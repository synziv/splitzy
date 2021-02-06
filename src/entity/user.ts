import { IGroup } from "./group";

export type IUser={
    id: string;
    name: string;
    total?: number;
    email: string;
    color?: string;
    groupId?: string;
    groups?: IGroup[];
}
export class User implements IUser{
    id=''
    name='';
    total=0;
    groupId='';
    email = '';
    color = '';
    groups= new Array<IGroup>();

    constructor(data:IUser){
        this.id = data.id;
        this.name = data.name;
        this.total = data.total || 0;
        this.color = data.color || '';
        this.groupId = data.groupId || '';
        this.email = data.email;
        this.groups = data.groups || [];
    }
}