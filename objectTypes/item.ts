import { type } from "os";
import { dbGroups, dbUsers } from "../fakeDb";
import { IUser } from "./user";

export type T_ItemProps = {
    item : IItem
    index: number;
    delete: (index:number)=>void;
}
export type IItem={
    name: string;
    total: number;
    user: number;
    splitMode: string | number;
    splitWith: number[];
    groupdId: number;
}
export class Item implements IItem{
    name='';
    total=0;
    splitMode = "all";
    groupdId=null;
    user= null;
    splitWith: number[];

    constructor(name: string, total:number, user:number, splitmode: any, splitWith: number[], groupId: number){
        this.name = name;
        this.total = total;
        this.user = user;
        this.splitMode= splitmode;
        this.groupdId = groupId;
        this.splitWith = splitWith.length==0 ? dbGroups.find(group => group.id == this.groupdId).usersIds:splitWith;
        this.splitTotal();

    }

    splitTotal(){
        const groupCount = this.splitWith.length;
        //split evenly between memebers of the group
        if(this.splitMode == 'all'){
            this.splitWith.forEach(userId=>{
                //search in the db the user associated with the userId iterated from the group
                //if the user in question is not the buyer of the item
                //then find in his owingArr the user who bought the item and add a debt associated with him
                if(userId!=this.user){
                    console.log('************');
                    console.log(groupCount);
                    dbUsers.find(user=>user.id == userId).
                    owingArr.find(x=> x.user==this.user).
                        owing+=this.total/groupCount;
                }
                    
            })
        }
        //split with a fraction between two member of the group
        else{
            if(typeof(this.splitMode) == "number"){
                dbUsers.find(user=>user.id == this.splitWith[0]).
                    owingArr.find(x=> x.user==this.user).
                        owing+=(this.total * this.splitMode)/groupCount;
            }
            //split evenly between specified members fo the group
            else if(this.splitMode == 'even'){
                this.splitWith.forEach(userId=>{
                    //search in the db the user associated with the userId iterated from the group
                    //if the user in question is not the buyer of the item
                    //then find in his owingArr the user who bought the item and add a debt associated with him
                    dbUsers.find(user=>user.id == userId).
                        owingArr.find(x=> x.user==this.user).
                        owing+=this.total/(groupCount+1);
                        
                });
            }
        } 
             
    }
    calculateDebt(){

    } 
}