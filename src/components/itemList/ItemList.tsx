import React, { useEffect } from 'react';
import { Fab, List, Button } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import AddItemDialog from './AddItemDialog';
import TotalPrice from './TotalPrice';
import ItemForList from './Item';
import { useDispatch, useSelector } from 'react-redux'
import { getUsersInGroup } from '../../redux/actions/user.actions';
import { getItems } from '../../redux/actions/items.actions';
import { firebaseInstance } from '../../utils/firebase';
import nookies from 'nookies';
import { State } from '../../redux/reducers';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { IGroup } from '../../entity/group';

const ItemList = ()=> {
    const dispatch = useDispatch();
    const location = useLocation();
    const match = useRouteMatch<{id:string}>();
    const itemList = useSelector((state:State)=>state.items.values);
    const [open, setOpen] = React.useState(false);
    console.log(match.params);
    useEffect(() => {
        dispatch(getUsersInGroup());
        dispatch(getItems(match.params.id));
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
    const signOut = ()=>{
        firebaseInstance.auth().signOut().then(()=>{
            nookies.set(undefined, 'token', '');
        });
        console.log('byebye')
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
            <AddItemDialog open={open} handleClose={handleClose}/>
            <Button onClick={signOut}>Sign out</Button>
        </div>
        
    );
}
export default ItemList;