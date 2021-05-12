import { Drawer, List, makeStyles } from '@material-ui/core'
import React from 'react'
import TitleNavItem from '../TitleNavItem/TitleNavItem';

import PropTypes from 'prop-types'

const drawerWidth = 260;

const useStyles = makeStyles((theme)=>({
    drawer:{
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper:{
        width:drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
}))
const Filters = (props) => {
    const classes = useStyles() 
    
    return (
        <Drawer
            className={classes.drawer} 
            variant={props.variant}
            classes={{
                paper: classes.drawerPaper
            }}
            anchor="left"
            open = {props.open}
            onClose={props.closed ? props.closed : null}
        >
            <div className={classes.toolbar}></div>                            
                <List component="nav">
                    {
                        props.items.map(item=>(
                            <div key={item}>
                                <TitleNavItem 
                                    nameItem={item === 'breed' ? "Razas" : "SubRazas"} 
                                    clicked={props.clicked} 
                                    openCol={item === "breed" ? props.openCol.collapseBreed : props.openCol.collapseSubBreed}
                                    dogCeo={props.dogCeo}
                                    change={props.change}
                                    type={item}
                                />
                            </div>                            
                        ))
                    }             
                </List>
            
        </Drawer>
    )
}

Filters.propTypes = {
    variant: PropTypes.string.isRequired,
    open: PropTypes.bool,   
    items: PropTypes.arrayOf(PropTypes.string),
    openCol: PropTypes.shape({
        collapseBreed: PropTypes.bool,
        collapseSubBreed: PropTypes.bool
    }),
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

    })),
    closed: PropTypes.func,
    clicked: PropTypes.func,
    change: PropTypes.func,
}

export default Filters
