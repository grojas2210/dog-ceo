import { Hidden, makeStyles } from '@material-ui/core'
import React from 'react'
import { DogContext } from '../../../context/DogCeoProvider'
import Card from '../../components/Card/Card'
import Filters from '../../components/Filters/Filters'
import Loading from '../../components/Loading/Loading'
import Navbar from '../../components/Navbar/Navbar'

const useStyles = makeStyles((theme)=> ({
    root: {
        display: 'flex'
    },
    toolBar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(3),
        marginTop:50
    },
})) 

const DogCeo = () => {
    const classes = useStyles()
    const {loading} = React.useContext(DogContext)   
    
    const ITEMS_COLLAPSE = ['breed', 'sub_breed'] 

    const [open, setOpen] = React.useState(false) 

    const openMenu = () =>{        
        setOpen(!open)
    }

    ////
    return (        
        <div className={classes.root}>
            <Navbar open={openMenu}/>
            <Hidden xsDown>
                <Filters 
                    variant="permanent" 
                    open={true} 
                    items={ITEMS_COLLAPSE} 
                />
            </Hidden>
            <Hidden smUp>
                <Filters 
                    variant="temporary" 
                    open={open} 
                    items={ITEMS_COLLAPSE}
                    closed={openMenu}/>
            </Hidden>            
            <div className={classes.content}>
                <div className={classes.toolBar}>       
                    {                        
                        !loading ? (
                            <Card />
                        ): 
                        <Loading/>
                    }             
                    
                </div>
            </div>    
        </div>        
    )
}

export default DogCeo
