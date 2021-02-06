export type IItem={
    id: string;
    name: string;
    total: number;
    user: string;
    splitMode: string;
    splitWith: string[];
    groupId: string;
}
export class Item implements IItem{
    id= '';
    name='';
    total=0;
    splitMode = '';
    groupId='';
    user= '';
    splitWith: string[];

    constructor(data:IItem){
        this.id = data.id;
        this.name = data.name;
        this.total = data.total;
        this.user = data.user;
        this.splitMode = data.splitMode;
        this.groupId = '-MS3W5LMXAwk9nqRl0Dc'//data.groupId;
        this.splitWith = data.splitWith;
    }
}
//name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number