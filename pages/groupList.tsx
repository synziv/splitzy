import React, { useEffect, Props } from 'react';
import { Fab, List, Button } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux'

import nookies from 'nookies';
import { State } from '../redux/reducers';
import AddGroupDialog from './addGroupDialog';
import { isUndefined } from 'util';
import { NextPage, GetServerSideProps } from 'next';
import GroupForList from './group';

const GroupList =()=> {
    const groupList = useSelector((state:State)=>{
            if(state.connectedUser.value && 'groups' in state.connectedUser.value)
                return (state.connectedUser.value.groups)
            else
                return ([])
    });
    //const groupsObj = useDispatch();
    const [open, setOpen] = React.useState(false);
    console.log(groupList)
    const generateGroup = () => {
        if(groupList)
            return groupList.map((group, index) => {
                return <GroupForList group={group} index={index} />
            })
    }
    
    const addGroup = ()=>{
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <List dense>
                {generateGroup()}
            </List> 
            <Fab color="primary" aria-label="add" onClick={addGroup}>
                <Add />
            </Fab>
            <AddGroupDialog open={open} handleClose={handleClose}/>
        </div>
        
    );
}
export default GroupList;