import { Hidden, makeStyles } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getBreedsDogsAction} from '../../redux/DogsDucks'
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
const DUMMY_DATA = [
    {
      breed: {
        name: "bulldog",
        type: "breed",
        checked: false
      },
      subBreed: [
        { name: "bulldog-boston", type: "sub_breed", checked: false },
        { name: "bulldog-english", type: "sub_breed", checked: false },
        { name: "bulldog-french", type: "sub_breed", checked: false }
      ],
      images: [
        "https://images.dog.ceo/breeds/bulldog-boston/20200710_175933.jpg",
        "https://images.dog.ceo/breeds/bulldog-boston/20200710_175944.jpg",
        "https://images.dog.ceo/breeds/bulldog-english/jager-1.jpg",
        "https://images.dog.ceo/breeds/bulldog-english/jager-2.jpg",
        "https://images.dog.ceo/breeds/bulldog-english/mami.jpg",
        "https://images.dog.ceo/breeds/bulldog-english/murphy.jpg",
        "https://images.dog.ceo/breeds/bulldog-french/n02108915_1343.jpg",
        "https://images.dog.ceo/breeds/bulldog-french/n02108915_142.jpg",
        "https://images.dog.ceo/breeds/bulldog-french/n02108915_1465.jpg"
      ],
    },
    {
      breed: {
        name: "collie",
        type: "breed",
        checked: false
      },
      subBreed: [
        { name: "collie-border", type: "sub_breed", checked: false }
      ],
      images: [
          "https://images.dog.ceo/breeds/collie-border/brodie.jpg",
          "https://images.dog.ceo/breeds/collie-border/n02106166_1031.jpg"
      ],
    },
    {
      breed: {
        name: "akita",
        type: "breed",
        checked: false
      },
      subBreed: [],
      images: [
          "https://images.dog.ceo/breeds/akita/Akina_Inu_in_Riga_1.jpg"
      ],
    }
]

const DogCeo = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const state  = useSelector(store => store.data.dataDogs)
    const loading = useSelector(store => store.data.loading)   
    const [dogCeo, setDogCeo] = React.useState(DUMMY_DATA) 
    
    const ITEMS_COLLAPSE = ['breed', 'sub_breed']    
    
    const DATA_UI = {
        collapseBreed: false,
        collapseSubBreed:false
    }

    const [open, setOpen] = React.useState(false) 
    const [openCollapses, setOpenCollapses] = React.useState(DATA_UI)
    
    React.useEffect(()=>{
        const fetchData = ()=>{
            dispatch(getBreedsDogsAction())                                           
        }
        fetchData()  
    },[dispatch])

    React.useEffect(()=>{
        setDogCeo(state)
    },[state])

    const openMenu = () =>{        
        setOpen(!open)
    }

    const handleClickCollapses = (value) =>{            
        if(value === "Razas"){
            setOpenCollapses({
                ...openCollapses,
                collapseBreed: !openCollapses.collapseBreed
            })
            
        }else{
            setOpenCollapses({
                ...openCollapses,
                collapseSubBreed: !openCollapses.collapseSubBreed
            })
        }
        
    }

    const checkBoxHandler = (arr, type, name, value) =>{   
        const listBreeds = arr.map(element =>{       
            if(type ==='breed'){
                if(element.breed.name === name){
                  return {...element, breed: {...element.breed, checked: !value}}
                }
            }  
            if(type === 'sub_breed') {            
                const newSubBreed = element.subBreed.map(sub=>{                
                    if(sub.name === name && element.breed.checked){
                        return {...sub, checked: !value}
                    }                        
                    return sub
                }) 
                return {...element, subBreed: newSubBreed} 
            }
            return element
        })
        setDogCeo(listBreeds)
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
                    clicked={handleClickCollapses} 
                    openCol={openCollapses}  
                    change={checkBoxHandler}                                                           
                    dogCeo={dogCeo}/>
            </Hidden>
            <Hidden smUp>
                <Filters 
                    variant="temporary" 
                    open={open} 
                    items={ITEMS_COLLAPSE} 
                    clicked={handleClickCollapses} 
                    openCol={openCollapses}
                    change={checkBoxHandler}  
                    dogCeo={dogCeo} 
                    closed={openMenu}/>
            </Hidden>            
            <div className={classes.content}>
                <div className={classes.toolBar}>       
                    {                        
                        !loading ? (
                            <Card dogCeo={dogCeo} />
                        ): 
                        <Loading/>
                    }             
                    
                </div>
            </div>    
        </div>        
    )
}

export default DogCeo
