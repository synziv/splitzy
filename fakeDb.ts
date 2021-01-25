import { IItem, Item, T_Item } from "./objectTypes/item";
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

//simple array containing all item created
export const dbItems : IItem[]=[];

//creating users
export const alexis = new User('alexis', 'green');
export const bea = new User('bea', 'purple');
export const john = new User('john', 'red');

//creating item
export let banane=null;
export let tomate=null;
export let pain=null;
export let saumon=null;


export const generateDB= ()=>{
    dbUsers.push(alexis, bea, john);

    //add the user to the group 1
    alexis.addGroup(1);
    bea.addGroup(1);
    john.addGroup(1);

    //adds items
    banane = new Item('banane', 10, 0, 'specified', [1,2], 1);
    //tomate = new Item('tomate', 20, 1, 0.3, [0], 1);
    //pain = new Item('pain', 9, 2, 'specified', [1], 1);
    //saumon = new Item('saumon', 30, 1, 'all', [], 1);

    console.log(dbUsers);
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

