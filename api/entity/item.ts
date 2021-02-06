export type IItem={
    name: string;
    total: number;
    user: number;
    splitMode: string | number;
    splitWith: number[];
    groupId: number;
}
export class Item implements IItem{
    name='';
    total=0;
    splitMode = null;
    groupId=null;
    user= null;
    splitWith: number[];

    constructor(data:IItem){
        this.name = data.name;
        this.total = data.total;
        this.user = data.user;
        this.splitMode = data.splitMode;
        this.groupId = '-MS3W5LMXAwk9nqRl0Dc'//data.groupId;
        this.splitWith = data.splitWith;
    }
}
//name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number