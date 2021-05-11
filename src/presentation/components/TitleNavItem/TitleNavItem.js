import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PetsTwoToneIcon from '@material-ui/icons/PetsTwoTone';
import React from 'react'
import ItemNav from '../ItemNav/ItemNav';

const TitleNavItem = (props) => {
    return (        
        <>
        <ListItem button onClick={()=>props.clicked(props.nameItem)}>
            <ListItemIcon>
                <PetsTwoToneIcon/>
            </ListItemIcon>
            <ListItemText primary={props.nameItem}/>
            {
                props.openCol ? <ExpandLessIcon/> : <ExpandMoreIcon/>
            }
        </ListItem> 
        <Collapse in={props.openCol} timeout="auto">
            <List component="div">                
                <ItemNav dogCeo={props.dogCeo} type={props.type} change={props.change}/>                
            </List>
        </Collapse> 
        
        </>
    )
}

export default TitleNavItem
