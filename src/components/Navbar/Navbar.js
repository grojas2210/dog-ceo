import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import React from 'react'

const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
    },
    menuButton:{
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title:{
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,        
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
    },
}))

const Navbar = (props) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>props.open()}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dog Ceo 
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
