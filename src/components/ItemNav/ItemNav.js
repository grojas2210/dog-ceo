import { Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PetsTwoToneIcon from '@material-ui/icons/PetsTwoTone';
import React from 'react'

const useStyles = makeStyles((theme) => ({       
    nested: {
      paddingLeft: theme.spacing(4),
    },
}));

const ItemNav = (props) => {
    const classes = useStyles()  
    
    const [open, setOpen] = React.useState(false) 
    const [isChecked, setIsChecked] = React.useState(props.data.slice().fill(false).flat())  
    const [buscados, setBuscado] = React.useState([])    
    

    React.useEffect(()=>{
        const fetchBuscados = () =>{
            props.arrayBuscados(buscados)
        }
        fetchBuscados()
    },[props,buscados])
    
    const handleClick = () =>{    
        setOpen(!open)  
    }   

    const toogleCheckChange = (index, breed) =>{ 
        const check = isChecked.map((estado,i) => { 
            return i === index ? !estado : estado
        })
        setIsChecked(check)  
        if(!isChecked[index]){ 
            if(!buscados.includes(breed)){
                setBuscado([
                    ...buscados,
                    breed
                ]) 
            }          
        }else{
            buscados.filter(item=> item !== breed)
            setBuscado(buscados.filter(item=> item !== breed))           
        }  
         
    }
    
    return (
        <List component="nav">
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <PetsTwoToneIcon/>
                </ListItemIcon>
                <ListItemText primary={props.nameItem}/>
                {
                    open ? <ExpandLessIcon/> : <ExpandMoreIcon/>
                }
            </ListItem> 
            {
                !props.loading &&
                (
                    <Collapse in={open} timeout="auto">
                        <List component="div">
                            {
                                props.data.map((item,index)=>(
                                    <ListItem key={`${item}${index}`} button className={classes.nested}>
                                        <ListItemIcon>
                                            <Checkbox value={item} checked={isChecked[index]} onChange={()=>toogleCheckChange(index,item)}></Checkbox>
                                        </ListItemIcon>
                                        <ListItemText primary={item}></ListItemText>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </Collapse>  
                )
            }
                     
        </List>
    )
}

export default ItemNav