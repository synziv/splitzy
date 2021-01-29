import React, { useEffect } from 'react';
import { Fab, List } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import AddItemDialog from './addItemDialog';
import TotalPrice from './totalPrice';
import ItemForList from './item';
import { useDispatch, useSelector } from 'react-redux'
import { getUsersInGroup } from '../../redux/actions/user.actions';
import { getItems } from '../../redux/actions/items.actions';
import { login } from '../../redux/actions/auth.actions';

const ItemList = ()=> {
    const dispatch = useDispatch();
    const itemList = useSelector(state=>state.items.values);
    const [open, setOpen] = React.useState(false);
    
    useEffect(() => {
        dispatch(getUsersInGroup());
        dispatch(getItems());
    }, []);
    const generateItem = () => {
        if(itemList)
            return itemList.map((item, index) => {
                return <ItemForList item={item} index={index} />
            })
    }
    
    
      
    //CRUD item methods
    /*add an item : 
        - change state to open dialog window
        - save recorded input if all is good
        - close dialog otherwise
    */
    const addItem = ()=>{
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <List dense>
                {generateItem()}
            </List>
            <TotalPrice />
            <Fab color="primary" aria-label="add" onClick={addItem}>
                <Add />
            </Fab>
            <AddItemDialog open={open} handleClose={handleClose}/>
        </div>
        
    );
}
export default ItemList;