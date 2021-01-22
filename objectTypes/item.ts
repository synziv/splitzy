import { type } from "os";
import { IUser } from "./user";

export type T_ItemProps = {
    item : IItem
    index: number;
    delete: (index:number)=>void;
}
export type IItem={
    name: string;
    total: number;
    user: IUser;
    splitMode: 'all' | number | {
        mode: 'even' | number
    },
    with? : IUser[]
}