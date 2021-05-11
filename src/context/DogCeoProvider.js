import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBreedsDogsAction } from '../domain/redux/DogsDucks'

export const DogContext = React.createContext()

const DogCeoProvider = (props) => {

    const dispatch = useDispatch()
    const state  = useSelector(store => store.data.dataDogs)
    const loading = useSelector(store => store.data.loading) 
    const [dogCeo, setDogCeo] = React.useState([]) 
    const [openCollapses, setOpenCollapses] = React.useState({
        collapseBreed: false,
        collapseSubBreed:false
    })

    React.useEffect(()=>{
        const fetchData = ()=>{
            dispatch(getBreedsDogsAction())                                           
        }
        fetchData()  
    },[dispatch])

    React.useEffect(()=>{
        setDogCeo(state)
    },[state])

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

     
    return (
        <DogContext.Provider value={{dogCeo, loading, openCollapses, checkBoxHandler, handleClickCollapses}}>
            {props.children}
        </DogContext.Provider>
    )
}

export default DogCeoProvider
