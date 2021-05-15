import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'
import {baseUrl} from '../url.json'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { Input } from '@material-ui/core'
import { AppBar } from '@material-ui/core';
import { Toolbar } from '@material-ui/core';
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin: 10
  },
  media: {
    height: 100,
  },
  all:{
    background: 'cornsilk'
},
  navigation:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#1976d2',
},

 a:{
    textDecoration: 'none',
    margin: 10,
    color: 'white',
},

filter:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
 
products:{
    display: 'flex',
    flexDirection: 'column',
}
});
const Main = () => {
    const classes = useStyles();
    const [data, setData] = useState([])
    const [inp, setInp] = useState('')
    const [currentPage, setCurrentPage]= useState(1)
    const [itemsPerPage]=useState(3)
    const pageNumbers=[]
    useEffect(()=>{
        api.get('product').then(r=>{
            setData(r.data.data)
            console.log(r.data);
        })
    },[])

    const sortByDateDown = () => {
        api.get('product/?sortD=down').then(r=>{
            setData(r.data.data);
        })
    }

    const sortByDateUp = () => {
        api.get('product/?sortD=up').then(r=>{
            setData(r.data.data);
            
        })
    }

    const sortByPriceDown = () => {
        api.get('product/?sortP=down').then(r=>{
            setData(r.data.data);
            
        })
    }

    const sortByPriceUp = () => {
        api.get('product/?sortP=up').then(r=>{
            setData(r.data.data);
            
        })
    }

    const chFn = (value) => {
        setInp(value)
        api.get(`product/?limit=${value}`).then(r=>{
            setData(r.data.data);
        })
    }


    for (let i=1;i<=Math.ceil(data.length/itemsPerPage);i++){
        pageNumbers.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage

    const currentItems = data.slice(indexOfFirstItem,indexOfLastItem)
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };


    return(
        <div className={classes.all}>
            <AppBar position="static">
                <Toolbar>
                <Link className={classes.a} to='/signIn'>Log in</Link>
                <Link className={classes.a} to='/signUp'>Register</Link>
            </Toolbar>
            </AppBar>
        
            <div className={classes.content}>
                <div className={classes.filter}>
                    <p>sort by date:</p><IconButton onClick={sortByDateUp}><ArrowUpwardIcon/></IconButton><IconButton onClick={sortByDateDown}><ArrowDownwardIcon/></IconButton>
                    <p>sort by price:</p><IconButton onClick={sortByPriceUp}><ArrowUpwardIcon/></IconButton><IconButton onClick={sortByPriceDown}><ArrowDownwardIcon/></IconButton>
                    <p>set limit:</p><Input value={inp} onChange={e=>chFn(e.target.value)}/>
                </div>
                <div className={classes.products}>
                {
                data&&currentItems.map(item=>{
                    return (
                <Card className={classes.root} key={item._id}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={baseUrl+item.image}
          title={item._id}
        />
        <CardContent>
            <Typography>{item._id}</Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {item.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
})
}
                        <Pagination count={pageNumbers.length}
                                    variant="outlined"
                                    color="secondary"
                                    page={currentPage}
                                    onChange={handleChange}
                        />
                    
                </div>
            </div>
             
        </div>
    )
}

export default Main