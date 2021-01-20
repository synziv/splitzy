import { type } from "os";
import { T_User } from "./user";

export type T_AddItemDialogProps = {
    open: boolean;
    handleClose: ()=>void;
    saveItem:(name:string, total:number, user: T_User)=>void;
}