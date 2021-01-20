import { T_Item } from "./objectTypes/item";
import { T_User } from "./objectTypes/user";

export const alexis: T_User = {
    name: 'Alexis',
    total: 0,
    color: 'green'
};
export const bea: T_User = {
    name: 'Beatrice',
    total: 0,
    color: 'purple'
};

export const defaultItemList: T_Item[]= [
    {
        name: 'banane',
        total : 10,
        user: alexis
    },
    {
        name: 'tomate',
        total : 5,
        user: bea
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

