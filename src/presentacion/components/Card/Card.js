import { CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { DogContext } from '../../../context/DogCeoProvider'

const useStyles = makeStyles((theme)=> ({   
    content: {
        flexGrow: 1,        
        padding: theme.spacing(3),      
    },
    
})) 

const Card = () => { 
    const classes = useStyles()
    const {dogCeo} = React.useContext(DogContext)   
    return (        
        <Grid container> 
        {
            dogCeo.map((filter)=>(
                filter.subBreed.filter(sb=>sb.checked).length === 0 && filter.breed.checked ?                         
                    filter.images.map(img=>( 
                        <Grid key={img} item xs={12} sm={6} md={4} className={classes.content}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={img}                            
                                    image={img}
                                    title={img}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {filter.breed.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea> 
                        </Grid> 
                    ) 
                ):
                (
                    filter.subBreed.filter(sb=>sb.checked).length > 0 &&
                    filter.subBreed.map(subBreed =>(
                        filter.images.map(img=>( 
                            (img.includes(subBreed.name) && subBreed.checked) &&
                            <Grid key={img} item xs={12} sm={6} md={4} className={classes.content}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={img}                            
                                    image={img}
                                    title={img}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {filter.breed.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea> 
                        </Grid> 
                        )) 
                    ))
                    
                )
            ))                        
        }           
                   
        </Grid> 
    )
}

export default Card
