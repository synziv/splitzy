import { T_Item } from "./objectTypes/item";
import { IUser, IGroup, User } from "./objectTypes/user";

//simple array containing all groups created
export const dbGroups: IGroup[] = [
    {
        id: 1,
        usersIds: []
    }
]
//simple arry contianing all users created
export const dbUsers : IUser[]=[];

//creating users
export const alexis = new User('alexis', 'green');
export const bea = new User('bea', 'purple');
export const john = new User('john', 'red');

//adding users to the user array


export const generateDB= ()=>{
    dbUsers.push(alexis, bea, john);

    //add the user to the group 1
    alexis.addGroup(1);
    bea.addGroup(1);
    john.addGroup(1);
}
export const defaultItemList: T_Item[]= [
    {
        name: 'banane',
        total : 10,
        user: alexis,
        splitMode: 'all'
    },
    {
        name: 'tomate',
        total : 5,
        user: bea,
        splitMode: {
            mode: 'even',
            with: [alexis]
        }
    },
    {
        name: 'kiwi',
        total : 20,
        user: alexis
    },
    {
        name: 'oumpaloumpa',
        total : 55,
        user: bea
    }
];

