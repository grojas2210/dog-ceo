import { Hidden, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getBreedsDogsAction, shearchImagesDogsAction} from '../../redux/DogsDucks'
import Card from '../Card/Card'
import Filters from '../Filters/Filters'
import Info from '../Info/Info'
import Loading from '../Loading/Loading'
import Navbar from '../Navbar/Navbar'

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
    const dispatch = useDispatch()
    const breeds = useSelector(store => store.data.data)
    const loading = useSelector(store => store.data.loading)   
    const images = useSelector(store=>store.data.data_images)           
    
    //console.log(Object.values(images))
    const [open, setOpen] = React.useState(false)   
    const [arrayBuscados, setArrayBuscados] = React.useState([]) 
    
    //console.log('arrayBuscados',arrayBuscados)
    React.useEffect(()=>{
        const fetchData = ()=>{
            dispatch(getBreedsDogsAction())                       
        }
        fetchData()
    },[dispatch])  

    React.useEffect(()=>{    
        const shearchDogs = () =>{             
            arrayBuscados.map(breed=>(
                dispatch(shearchImagesDogsAction(breed)) 
            ))   
        }
        shearchDogs()
    },[dispatch, arrayBuscados])

    const arrayBreeds = breeds.map(item=>{
        return item.breed
    })
    
    const arraySubBreeds = breeds.filter(item=>{
        return (item.subBreed.length > 0) ? item.subBreed : null
    }).map(e =>{ 
        return e.subBreed
    })

    const openMenu = () =>{        
        setOpen(!open)
    }

    const getArrayBuscados = (buscados) =>{
        if(buscados.length > 0 ){
            setArrayBuscados(buscados)      
        }   
    }     
   
    return (        
        <div className={classes.root}>
            <Navbar open={openMenu}/>
            <Hidden xsDown>
                <Filters variant="permanent" open={true} dataBreeds={arrayBreeds} dataSubBreeds={arraySubBreeds} loading={loading} buscados={getArrayBuscados}/>
            </Hidden>
            <Hidden smUp>
                <Filters variant="temporary" open={open} dataBreeds={arrayBreeds} dataSubBreeds={arraySubBreeds} loading={loading} buscados={getArrayBuscados} closed={openMenu}/>
            </Hidden>            
            <div className={classes.content}>
                <div className={classes.toolBar}>       
                    {
                        !loading ? (
                            images.length > 0 ? (
                                <Card images={images} breedSearch={arrayBuscados}/>
                            ) :
                            <Info/> 
                        ): 
                        <Loading/>
                    }             
                    
                </div>
            </div>    
        </div>        
    )
}

export default DogCeo
