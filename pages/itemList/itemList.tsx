import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Item from './item';
import { Fab, List } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import AddItemDialog from './addItemDialog';
import { IUser } from '../../objectTypes/user';
import { IItem } from '../../objectTypes/item';
import { alexis, bea, defaultItemList, generateDB, dbUsers } from '../../fakeDb';
import TotalPrice from './totalPrice';


export default function ItemList() {
    generateDB();
    console.log(dbUsers);
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    const [itemList, setItemList] = React.useState<Array<IItem>>([...defaultItemList]);
    const [open, setOpen] = React.useState(false);
    const [users, setUsers] = React.useState<Array<IUser>>([alexis, bea])
    
    const generateItem = ()=>
        itemList.map((item, index) => {
            return <Item item={item} index={index} delete= {deleteItem}/>
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
        console.log('delete '+ index);
        let temp_itemList = [...itemList];
        temp_itemList.splice(index, 1);
        setItemList(temp_itemList);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const saveItem = (name: string, total: number, user: T_User) => {
        let temp_itemList = [...itemList];
        temp_itemList.push({
            name: name,
            total: total,
            user: user
        });
        setItemList(temp_itemList);
    }
    return (
        <div>
            <List dense className={classes.root}>
                {generateItem()}
            </List>
            <TotalPrice itemList={itemList}/>
            <Fab color="primary" aria-label="add" onClick={addItem}>
                <Add />
            </Fab>
            <AddItemDialog open={open} handleClose={handleClose} saveItem={saveItem}/>
        </div>
        
    );
}