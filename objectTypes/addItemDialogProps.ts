import { type } from "os";
import { IUser } from "./user";

export type T_AddItemDialogProps = {
    open: boolean;
    handleClose: ()=>void;
}
export type T_UserForListProps={
    user: IUser;
    index:number;
    handleToggle: (userId: string)=>void;
    checked: boolean;
}