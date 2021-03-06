export type IItem={
    name: string;
    total: number;
    user: string;
    splitMode: any;
    splitWith: string[];
    groupId: string;
}
export class Item implements IItem{
    name='';
    total=0;
    splitMode='';
    groupId;
    user;
    splitWith: string[];

    constructor(data:IItem){
        this.name = data.name;
        this.total = data.total;
        this.user = data.user;
        this.splitMode = data.splitMode;
        this.groupId = data.groupId;
        this.splitWith = data.splitWith;
    }
}
// name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number