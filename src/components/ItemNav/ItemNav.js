import { Checkbox, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'

import React from 'react'

const useStyles = makeStyles((theme) => ({       
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));

const ItemNav = (props) => {
    const classes = useStyles()
    return ( 
        <>   
        {            
            props.type === 'sub_breed' ? 
            (
                props.dogCeo.map((filter,idx)=>(
                    filter.breed.checked &&
                    filter.subBreed.map(sub=>(    
                        <ListItem key={`${sub.name}${idx}`} button className={classes.nested}>
                            <ListItemIcon>                                            
                                <Checkbox                                     
                                    onChange={()=>props.change(props.dogCeo, props.type, sub.name, sub.checked)}
                                    value={sub.name}
                                    checked={sub.checked}
                                />                                                                                      
                            </ListItemIcon>
                            <ListItemText primary={sub.name}></ListItemText>
                        </ListItem> 
                    ))
                ))
            ) : (
            props.dogCeo.map((filter,idx)=>(
                <ListItem key={`${filter.breed.name}${idx}`} button className={classes.nested}>
                    <ListItemIcon>                                            
                        <Checkbox 
                            onChange={()=>props.change(props.dogCeo, props.type, filter.breed.name, filter.breed.checked)}
                            value={filter.breed.name}
                            checked={filter.breed.checked}
                        />                                                                                      
                    </ListItemIcon>
                    <ListItemText primary={filter.breed.name}></ListItemText>
                </ListItem> 

            ))                
            )
        }    
        </> 
    )
}

export default ItemNav