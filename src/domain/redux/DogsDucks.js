import axios from 'axios'
import configuration from '../../config/config'
//contantes


const dataInicial = {
    dataDogs: [],   
    loading: true
}


//types
const LOADING_DATA = 'LOADING_DATA'
const GET_BREEDS_DOGS_SUCCESS = 'GET_BREEDS_DOGS_SUCCESS'

//reducer

export default function dogsReducer(state = dataInicial, action){
    switch (action.type){
        case LOADING_DATA:
            return {...state, loading:false}
        case GET_BREEDS_DOGS_SUCCESS:
            return{...state, dataDogs: action.payload, loading: false}  
        default:
            return {...state}
    }
    
}

//actions
export const getBreedsDogsAction = () => async(dispatch) =>{
    dispatch({
        type: LOADING_DATA
    })
    if(sessionStorage.getItem('dataDogs')){
        dispatch({
            type: GET_BREEDS_DOGS_SUCCESS,
            payload: JSON.parse(sessionStorage.getItem('dataDogs')),
        }) 
        return
    }
    try {        
        const res = await axios.get(`${configuration.API_URL_BASE}${configuration.ENDPOINT_BREEDS}`)        
        const arrayNew = Object.entries(res.data.message)
                .map(([key,value]) => {
                    const objSub = []
                    if(value.length > 0){
                        value.map(sub =>(
                            objSub.push({name: `${key}-${sub}`, type: "sub_breed", checked: false})                            
                        ))                        
                    }else{
                        objSub.push()                        
                    }                    
                    return {images: [], breed: {name: key,type: "breed", checked: false},subBreed: objSub}
                }) 

        const asyncImages = await Promise.all(arrayNew.map(async(element)=>{
            const res = await axios.get(`${configuration.API_URL_BASE}${configuration.ENDPOINT_IMAGES_BREEDS}${element.breed.name}/images`)            
            if(res.status === 200){ 
                const objeto = {
                    ...element,
                    images: res.data.message
                }                  
                return objeto             
            }  
        }))

        if(res.status === 200){
            dispatch({
                type: GET_BREEDS_DOGS_SUCCESS,
                payload: asyncImages,
            })            
        }
        sessionStorage.setItem('dataDogs', JSON.stringify(asyncImages))
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

