import axios from 'axios'
import configuration from '../config/config'
//contantes


const dataInicial = {
    data:[],
    loading: true,
    data_images: []
}

//types
const LOADING_DATA = 'LOADING_DATA'
const GET_BREEDS_DOGS_SUCCESS = 'GET_BREEDS_DOGS_SUCCESS'
const GET_IMAGES_BREEDS_DOGS_SUCCESS = 'GET_IMAGES_BREEDS_DOGS_SUCCESS'

//reducer

export default function dogsReducer(state = dataInicial, action){
    switch (action.type){
        case LOADING_DATA:
            return {...state, loading:false}
        case GET_BREEDS_DOGS_SUCCESS:
            return{...state, data: action.payload, loading: false}
        case GET_IMAGES_BREEDS_DOGS_SUCCESS:
            return{...state, data_images:action.payload, loading:false}
        default:
            return {...state}
    }
    
}

//actions
export const getBreedsDogsAction = () => async(dispatch) =>{
    dispatch({
        type: LOADING_DATA
    })
    if(sessionStorage.getItem('dataFilter')){
        dispatch({
            type: GET_BREEDS_DOGS_SUCCESS,
            payload: JSON.parse(sessionStorage.getItem('dataFilter')),
        }) 
        return
    }
    try {        
        const res = await axios.get(`${configuration.API_URL_BASE}${configuration.ENDPOINT_BREEDS}`)        
        const arrayNew = Object.entries(res.data.message)
                .map(([key,value]) => {
                    return { breed: key, subBreed: value}
                })           
        if(res.status === 200){
            dispatch({
                type: GET_BREEDS_DOGS_SUCCESS,
                payload: arrayNew,
            })            
        }
        sessionStorage.setItem('dataFilter', JSON.stringify(arrayNew))
    } catch (error) {
        switch(error.response.status){
            case 404:
                console.log('Error 404')
                return
            case 500:
                console.log('Error 500')
                return
            default: 
                console.log('Error general')
                return
        }
    }
}

export const shearchImagesDogsAction = (breed_name,arrayBuscados) => async(dispatch,getState) =>{    
    const {data_images} = getState().data 
    dispatch({
        type: LOADING_DATA
    }) 
    
    try {          
        const arrayImgs = []                 
        const res = await axios.get(`${configuration.API_URL_BASE}${configuration.ENDPOINT_IMAGES_BREEDS}${breed_name}/images`)                    
        if(res.status === 200){                   
            res.data.message.map(img=>(                
                arrayImgs.push(img)
            ))              
        }         
        const arrayInitDogs = [...data_images, [{imgs: arrayImgs ,breedName: breed_name}]].flat()
        const uniqueArrayDogs = Array.from(new Set(arrayInitDogs.map(a => a.breedName)))
            .map(b =>{
                return arrayInitDogs.find(a=>a.breedName === b)
            }) 
        const arrayDogs = uniqueArrayDogs.filter(obj =>{
            return arrayBuscados.indexOf(obj.breedName) !== -1 ? obj : null
        }, arrayBuscados)

        dispatch({
            type: GET_IMAGES_BREEDS_DOGS_SUCCESS,
            payload: arrayDogs
        })         
            
        
    } catch (error) {
        switch(error.response.status){
            case 404:
                console.log('Error 404')
                return
            case 500:
                console.log('Error 500')
                return
            default: 
                console.log('Error general')
                return
        }
    }
}

