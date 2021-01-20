import { type } from "os";
import { T_User } from "./user";

export type T_ItemProps = {
    item : T_Item
    index: number;
    delete: (index:number)=>void;
}
export type T_Item={
    name: string;
    total: number;
    user: T_User;
}