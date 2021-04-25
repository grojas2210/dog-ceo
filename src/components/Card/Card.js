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
    console.log("imagesCard", props.images) 

    return (        
        <Grid container> 
        {
            props.images.map((item,i) =>(
                <Grid key={`${item.img}${i}`} item xs={12} sm={6} md={4} className={classes.content}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={item.img}                            
                            image={item.img}
                            title={item.img}
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                               perritos
                            </Typography>
                        </CardContent>
                    </CardActionArea> 
                </Grid>     

            ))
        }           
                   
        </Grid> 
    )
}

export default Card
