import { type } from "os";
import { IUser } from "./user";

export type T_AddItemDialogProps = {
    open: boolean;
    handleClose: ()=>void;
    saveItem:(name:string, total:number, user: number, splitMode: string | number, splitWith: number[], groupdId:number )=>void;
}
export type T_UserForListProps={
    user: IUser;
    index:number;
    handleToggle: (userId: number)=>void;
    checked: boolean;
}