import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Item from './item';
const defaultItemList= [
    {
        name: 'banane',
        total : 10,
        checked : false,
    },
    {
        name: 'tomate',
        total : 5,
        checked : false,
    },
    {
        name: 'kiwi',
        total : 20,
        checked : true,
    },
    {
        name: 'oumpaloumpa',
        total : 55
        ,checked : false,
    }
]
export default function ItemList() {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }));
    const classes = useStyles();
    const [itemList, setItemList] = React.useState(defaultItemList);

    const handleToggle = useCallback((index) => {
        const temp_itemList = [...itemList];
        itemList[index].checked = !itemList[index].checked;
        setItemList([...temp_itemList]);
    }, []); 
    return (
        <List dense className={classes.root}>
            {itemList.map((item, index) => {
                return <Item name={item.name} total={item.total} index={index}/>
            })}
        </List>
    );
}