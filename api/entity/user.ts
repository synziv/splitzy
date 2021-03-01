export type IUser={
    name: string;
    total?: number;
    email: string;
    color?: string;
    groupId?: string;
    id?: string;
}
export class User implements IUser{
    name='';
    total=0;
    groupId;
    email = '';
    color = '';
    id;

    constructor(data:IUser){
        this.name = data.name;
        this.total = data.total || 0;
        this.color = data.color || '';
        this.groupId = data.groupId || '';
        this.email = data.email;
        this.id = data.id;
    }
}