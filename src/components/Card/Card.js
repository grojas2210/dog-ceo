import { CardActionArea, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme)=> ({   
    content: {
        flexGrow: 1,        
        padding: theme.spacing(3),      
    },
    
})) 

const Card = (props) => { 
    const classes = useStyles() 

    //props.images.map(item=>console.log(item))
   
    return (        
        <Grid container> 
        {
            props.images.map((item) =>(
                item.imgs.map((img,i)=>(
                    <Grid key={`${item.img}${i}`} item xs={12} sm={6} md={4} className={classes.content}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt={img}                            
                                image={img}
                                title={img}
                            />
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {item.breedName}
                                </Typography>
                            </CardContent>
                        </CardActionArea> 
                    </Grid>  
                ))
            ))
        }           
                   
        </Grid> 
    )
}

export default Card
