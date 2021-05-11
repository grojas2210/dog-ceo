import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
      textAlign:"center",
      marginTop: theme.spacing(2)      
    },
}));

const Loading = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress color="secondary"/>
        </div>
    )
}

export default Loading
