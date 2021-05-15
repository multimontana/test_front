import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import {useHistory} from "react-router-dom";
import MUIDataTable from "mui-datatables";
import api from "../api";
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import {baseUrl} from "../url.json"
import TextField from "@material-ui/core/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflowX: "hidden",
        overflowY: "hidden",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const columns = [
    {
        name: "id",
        label: "ID",
        options: {
            filter: false,
            download: false,
            print: false,
            sort: false,
        }
    },
    {
        name: "image",
        label: "Image",
        options: {
            filter: false,
            sort: false,
        }
    },
    {
        name: "title",
        label: "Title",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "description",
        label: "Description",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "price",
        label: "Price",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "action",
        label: "Action",
        options: {
            filter: true,
            sort: false,
        }
    }
];

export default function Product() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [files,setFiles] = useState('')
    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [edit,setEdit] = useState({})
    const [editTitle,setEditTitle] = useState({})
    const [editDescription,setEditDescription] = useState({})
    const [editPrice,setEditPrice] = useState({})
    const [vals,setVals] = useState([])

    const options = {
        filter: false,
        response: "stacked",
        download: false,
        print: false,
        viewColumns: false,
        selectableRows: false
    };
    const getProduct = () =>{
        return   api.get('product').then(res => {
            if (res.data && res.data.data) {
                let data = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    data.push({
                        id: res.data.data[i]._id,
                        image: <Avatar alt="Remy Sharp" src={baseUrl + res.data.data[i].image}/>,
                        title: res.data.data[i].title,
                        description: res.data.data[i].description,
                        price: res.data.data[i].price,
                        date: res.data.data[i].createdAt,
                        action: <div>
                            <Button onClick={()=>{
                                setEdit(res.data.data[i])
                            }}>Edit</Button>
                            <Button onClick={()=>{
                                const headers = {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                                api.delete('product/'+data[i].id,{
                                    headers: headers
                                }).then(res=>{
                                    if (res){
                                        getProduct()
                                    }
                                })
                            }}>Delete</Button>
                                </div>
                            })
                            }
            setData(data)
            }
            })
            }
            useEffect(() => {
                   if (!localStorage.getItem('token')){
                       history.push('/signIn')
                   }
                    setLoading(true);
                    getProduct().then(()=>{
                        setLoading(false);
                    })
                }, [])
            const validationAdd = () => {
                    if (title && description && price && files[0] && files[0].name){
                        return false
                    }else {
                        return true
                    }
                }
            return (
                <div className={classes.root}>
                    <Dialog
                        open={edit.title?true:false}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle style={{textAlign: "center"}}>Edit Product</DialogTitle>
                        <DialogContent>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="title"
                                            value={edit.title}
                                            label="Title"
                                            name="title"
                                            onChange={(event)=>{
                                                let edits = edit;
                                                setEditTitle(event.target.value)
                                                edits.title = event.target.value
                                                setEdit(edits)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            name="description"
                                            value={edit.description}
                                            onChange={(event)=>{
                                                let edits = edit;
                                                setEditDescription(event.target.value)
                                                edits.description = event.target.value
                                                setEdit(edits)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            type="number"
                                            id="price"
                                            value={edit.price}
                                            label="Price"
                                            name="price"
                                            onChange={(event)=>{
                                                let edits = edit;
                                                setEditPrice(event.target.value)
                                                edits.price = event.target.value
                                                setEdit(edits)
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={()=>{
                                                const body = {
                                                    _id: edit._id,
                                                    title: edit.title,
                                                    description: edit.description,
                                                    price: edit.price,
                                                    image: edit.image
                                                }
                                                const headers = {
                                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                                }

                                                api.post('product/update',body,{
                                                    headers: headers
                                                }).then(res =>{
                                                    if (res && res.data){
                                                        getProduct().then(()=>{
                                                            let content = data;
                                                            for (let i=0;i<content.length;i++){
                                                                if (content[i].id === edit._id){
                                                                    content[i].title = edit.title;
                                                                    content[i].description = edit.description;
                                                                    content[i].price = edit.price;
                                                                }
                                                            }
                                                            setEdit({})
                                                            setData(content)

                                                        })
                                                    }
                                                })
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button color="inherit" onClick={() => {
                                setEdit({})
                            }}>Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" className={classes.title}>
                                Product
                            </Typography>
                            <Button color="inherit" onClick={() => {
                                localStorage.removeItem('token');
                                history.push('signIn')
                            }}>Logout</Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container spacing={3} style={{marginTop: 50}}>
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
                            <div style={{width: "100%", justifyContent: "center", display: loading ? 'flex' : 'none'}}>
                                <CircularProgress/>
                            </div>

                            {!loading ? <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="title"
                                                label="Title"
                                                name="title"
                                                onChange={(event)=>{
                                                    setTitle(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="description"
                                                label="Description"
                                                name="description"
                                                onChange={(event)=>{
                                                    setDescription(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                type="number"
                                                id="price"
                                                label="Price"
                                                name="price"
                                                onChange={(event)=>{
                                                    setPrice(event.target.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                component="label"
                                                fullWidth
                                            >
                                                {files[0] && files[0].name?files[0].name:"Upload"}
                                                <input
                                                    accept="image/*"
                                                    type="file"
                                                    hidden
                                                    defaultValue={files}
                                                    onChange={event =>
                                                        setFiles(event.target.files)
                                                    }
                                                />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            < Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                disabled={validationAdd()}
                                                onClick={()=>{
                                                    if (!validationAdd()){
                                                        let data = new FormData();
                                                        data.append('title',title);
                                                        data.append('description',description);
                                                        data.append('price',price);
                                                        data.append('image',files[0]);
                                                        const headers = {
                                                            'Content-Type': 'multipart/form-data',
                                                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                                                        }
                                                        api.post('product/add ',data,{
                                                            headers: headers
                                                        }).then(res =>{
                                                            if (res && res.data){
                                                                getProduct().then(()=>{
                                                                    setTitle('');
                                                                    setPrice('');
                                                                    setDescription('');
                                                                    setFiles('')
                                                                })
                                                            }
                                                        })
                                                    }
                                                }}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <MUIDataTable
                                        style={{width: "100%"}}
                                        title={"Product List"}
                                        data={data}
                                        columns={columns}
                                        options={options}
                                    />
                                </Grid>
                            </Grid> : null}

                        </Grid>
                        <Grid item xs={1}/>
                    </Grid>
                </div>
            );
            }
