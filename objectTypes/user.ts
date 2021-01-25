import { type } from "os";
import { bea, dbGroups, dbUsers, john } from "../fakeDb";
import { isUndefined } from "util";

export interface IUser {
    id: number
    name: string;
    total: number;
    color: string;
    owingArr?: {user: number, owing:number}[];
    groups: number[]
}
export interface IGroup {
    id: number;
    usersIds: number[];
}
let userId =0;
export class User implements IUser {
    id=null;
    name= '';
    total= 0;
    color= '';
    owingArr= [];
    groups=[];
    constructor(name:string, color:string){
        this.id = userId;
        this.name = name;
        this.color = color;

        userId++;
    }
    addGroup = (groupId)=>{
        //add the group to the user array of groups he joined
        this.groups.push(groupId)

        //add the user id to the users array in the group he joined
        dbGroups.find(group=>group.id == groupId).usersIds.push(this.id)
        
        //call the generateOwingArr function to update the owing array of every user in the group
        this.generateOwingArr(groupId);
    }
    generateOwingArr = (groupId: number)=>{
        //find the group with the id
        const usersGroup = dbGroups.find(group => group.id == groupId);
        //populate the owing array
        usersGroup.usersIds.forEach(userId =>{
            //adds every user to owingArr of the instance user
            if(userId != this.id ){
                this.owingArr.push({
                    user: userId,
                    owing: 0
                });
                dbUsers.find(user => user.id == userId).owingArr.push({
                    user: this.id,
                    owing:0
                });
            }
        });
    }

}



/*[bea, alexis, john]
bea: loop sur 1 user et fait rien car cest le mm que linstance

alexis: 
    commence sur bea, pas pareil que linstance donc ajoute a alexis et ajoute linstance(alexis) a bea

john:
    commence sur bea, pas pareil que linstance donc ajoute bea a john et ajoute john a bea
    ensuite sur alexis, pas pareil que linstance donc ajoute alexis a john et ajoute john a alexis*/