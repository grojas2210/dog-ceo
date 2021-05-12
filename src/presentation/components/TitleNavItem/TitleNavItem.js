import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PetsTwoToneIcon from '@material-ui/icons/PetsTwoTone';
import React from 'react'
import ItemNav from '../ItemNav/ItemNav';

import PropTypes from 'prop-types'

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

TitleNavItem.propTypes = {
    nameItem: PropTypes.string,
    openCol: PropTypes.bool,
    type: PropTypes.string,
    change: PropTypes.func.isRequired,
    clicked: PropTypes.func,
    dogCeo: PropTypes.arrayOf(PropTypes.shape({        
        breed: PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            checked: PropTypes.bool,
        }),
        subBreed: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            checked: PropTypes.bool, 
        })),
        images: PropTypes.arrayOf(PropTypes.string)

    }))    
}

export default TitleNavItem
