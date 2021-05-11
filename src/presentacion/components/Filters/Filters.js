import { Drawer, List, makeStyles } from '@material-ui/core'
import React from 'react'
import { DogContext } from '../../../context/DogCeoProvider';
import TitleNavItem from '../TitleNavItem/TitleNavItem';
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
    const {openCollapses} = React.useContext(DogContext)

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
                                    openCol={item === "breed" ? openCollapses.collapseBreed : openCollapses.collapseSubBreed}                                    
                                    type={item}
                                />
                            </div>                            
                        ))
                    }             
                </List>
            
        </Drawer>
    )
}

export default Filters
