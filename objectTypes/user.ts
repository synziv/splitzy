import { type } from "os";
import { dbGroups, dbUsers } from "../fakeDb";
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
    id=userId;
    name= '';
    total= 0;
    color= '';
    owingArr= [];
    groups=[];
    constructor(name:string, color:string){
        userId ++;
        this.name = name;
        this.color = color;
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
        let owingArr = [];

        //find the group with the id
        const usersGroup = dbGroups.find(group => group.id == groupId);

        //populate the owing array
        usersGroup.usersIds.forEach(userId =>{
            //adds the other user in the group if not already there or is the instance user
            const userInGroup =  dbUsers.find(user => user.id == userId);

            //adds every user to owingArr of the instance user
            if(userInGroup.id != this.id ){
                owingArr.push({
                    user: userId,
                    owing: 0
                });
                userInGroup.owingArr.push({user: this.id, owing: 0})
            }
                
            
            //adds instance user to owingArr of every other users

                
        });
        return owingArr;
    }

}