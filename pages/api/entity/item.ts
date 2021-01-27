export type IItem={
    id?: number;
    name: string;
    total: number;
    user: number;
    splitMode: string | number;
    splitWith: number[];
    groupId: number;
}
export class Item implements IItem{
    id=-1
    name='';
    total=0;
    splitMode = "all";
    groupId=null;
    user= null;
    splitWith: number[];

    constructor(data, nextId:number){
        this.id= nextId;
        this.name = data.name;
        this.total = data.total;
        this.user = data.user;
        this.splitMode= data.splitMode;
        this.groupId = data.groupId;
        this.splitWith = data.splitWith;
    }
}
//name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number