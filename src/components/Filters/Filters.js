import { Drawer, makeStyles } from '@material-ui/core'
import React from 'react'
import ItemNav from '../ItemNav/ItemNav';
const drawerWidth = 240;

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
            <ItemNav nameItem="Razas" data={props.dataBreeds} loading={props.loading} arrayBuscados={props.buscados}/>
            <ItemNav nameItem="SubRazas" data={props.dataSubBreeds} loading={props.loading} arrayBuscados={props.buscados}/>
        </Drawer>
    )
}

export default Filters
