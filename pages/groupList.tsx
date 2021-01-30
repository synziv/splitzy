import React, { useEffect } from 'react';
import { Fab, List, Button } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

import nookies from 'nookies';
import { State } from '../redux/reducers';
import AddGroupDialog from './addGroupDialog';
import { isUndefined } from 'util';

const GroupList = ()=> {
    const dispatch = useDispatch();
    const groupList = useSelector((state:State)=>{
        if(state.connectedUser.value.groups === undefined)
            return (state.connectedUser.value.groups)
        else
            return ([])
    });
    //const groupsObj = useDispatch();
    const [open, setOpen] = React.useState(false);
    
    const generateGroup = () => {
        //if(groupList)
            /*return itemList.map((item, index) => {
                return <ItemForList item={item} index={index} />
            })*/
    }
    
    
      
    //CRUD item methods
    /*add an item : 
        - change state to open dialog window
        - save recorded input if all is good
        - close dialog otherwise
    */
    const addGroup = ()=>{
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            {/* <List dense>
                {generateGroup()}
            </List> */}
            <Fab color="primary" aria-label="add" onClick={addGroup}>
                <Add />
            </Fab>
            <AddGroupDialog open={open} handleClose={handleClose}/>
        </div>
        
    );
}
export default GroupList;