import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, List } from '@material-ui/core';
import {Add, Store} from '@material-ui/icons';
import AddItemDialog from './addItemDialog';
import { IUser } from '../../objectTypes/user';
import { IItem, Item } from '../../objectTypes/item';
import { dbItems, generateDB, dbUsers } from '../../fakeDb';
import TotalPrice from './totalPrice';
import ItemForList from './item';
import { useDispatch, connect, useSelector } from 'react-redux'
import { getUsersInGroup } from '../redux/actions/user.actions';
import { getItems } from '../redux/actions/items.actions';

const ItemList = ()=> {
    const dispatch = useDispatch();
    const itemList = useSelector(state=>state.items.values);
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        dispatch(getUsersInGroup());
        dispatch(getItems());
    }, []);
    const generateItem = ()=>
    itemList.map((item, index) => {
            return <ItemForList item={item} index={index} delete= {deleteItem}/>
    })
    
      
    //CRUD item methods
    /*add an item : 
        - change state to open dialog window
        - save recorded input if all is good
        - close dialog otherwise
    */
    const addItem = ()=>{
        setOpen(true);
    }
    const deleteItem =(index:number)=>{
        let temp_itemList = [...itemList];
        temp_itemList.splice(index, 1);
        setItemList(temp_itemList);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const saveItem = (name: string, total: number, user: number, splitMode: string | number, splitWith: number[], groupId:number ) => {
        let temp_itemList = [...itemList];
        temp_itemList.push(new Item(name, total, user, splitMode, splitWith, groupId))
        setItemList(temp_itemList);
    }
    return (
        <div>
            <List dense>
                {generateItem()}
            </List>
            <TotalPrice />
            <Fab color="primary" aria-label="add" onClick={addItem}>
                <Add />
            </Fab>
            <AddItemDialog open={open} handleClose={handleClose} saveItem={saveItem}/>
        </div>
        
    );
}
export default ItemList;