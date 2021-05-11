import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PetsTwoToneIcon from '@material-ui/icons/PetsTwoTone';
import React from 'react'
import { DogContext } from '../../../context/DogCeoProvider';
import ItemNav from '../ItemNav/ItemNav';

const TitleNavItem = (props) => {
    const {handleClickCollapses} = React.useContext(DogContext)
    
    return (        
        <>
        <ListItem button onClick={()=>handleClickCollapses(props.nameItem)}>
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
                <ItemNav type={props.type} />                
            </List>
        </Collapse> 
        
        </>
    )
}

export default TitleNavItem
