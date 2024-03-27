import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateUser, GetAllUsers, GetUserbycode, RemoveUser, UpdateUser } from "../Redux/ActionCreator";
import { connect, useDispatch, useSelector } from "react-redux";
import { OpenPopup } from "../Redux/Action";
import CloseIcon from "@mui/icons-material/Close";
import './Home.css'

const Home = (props) => {
    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'username', name: 'User Name' },
        { id: 'email', name: 'Email' },
        { id: 'role', name: 'Role' },
        { id: 'action', name: 'Action' }
    ]

    const dispatch = useDispatch();

    const [id, setid] = useState(0);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [username, setusername] = useState('');
    const [role, setrole] = useState('');

    const [open, openchange] = useState(false);
    const [agreeterm, agreetermchange] = useState(true);

    const [rowperpage, setrowperpage] = useState(5);
    const [page, pagechange] = useState(0);
    const [emailerror,setemailerror]=useState('')

    const [isedit, setisedit] = useState(false);
    const [title, settitle] = useState('Create user');

    const editobj = useSelector((state) => state.userreducer.userobj);


    const handleemail=(e)=>{
        setemail(e.target.value)
        if(!validateemail(e.target.value)){
            setemailerror('please enter valid proper email format')
        }
        else{
            setemailerror('')
        }
    }


    const validateemail=(email)=>{
        let emailregex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
        return emailregex.test(email)

    }
    useEffect(()=>{
        if(Object.keys(editobj).length)
        {
            setid(editobj.id);
            setname(editobj.name);
            setemail(editobj.email);
            setusername(editobj.usename);
            setrole(editobj.role);
            
        }
        else{
            clearstate();
        }

    },[editobj])

    const handlepagechange = (event, newpage) => {
        pagechange(newpage);
    }

    const handlerowperpagechange = (event) => {
        setrowperpage(+event.target.value);
        pagechange(0);
    }

    const functionadd = () => {
        setisedit(false);
        settitle('Create company');
        openpopup();
    }
    const closepopup = () => {
        openchange(false);
    }
    const openpopup = () => {
        openchange(true);
        clearstate();
        dispatch(OpenPopup())
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        const _obj = { id, name, username,email, role};
        if (isedit) {
            dispatch(UpdateUser(_obj));
        } else {
            dispatch(CreateUser(_obj));
        }
        closepopup();
    }

    const handleEdit = (code) => {
        setisedit(true);
        settitle('Update company');
        openchange(true);
        dispatch(GetUserbycode(code))
    }

    const handleRemove = (code) => {
        if (window.confirm('Do you want to remove?')) {
            dispatch(RemoveUser(code));
        }
    }


    const clearstate = () => {
        setid(0);
        setname('');
        setemail('');
        setusername('');
        setrole('');
    }
    useEffect(() => {
        props.loaduser();
    }, [])
    return (
        props.userstate.isloading ? <div><h2>Loading.....</h2></div> :
        props.userstate.errormessage ? <div><h2>{props.userstate.errormessage}</h2></div> :
            <div className="parentdiv">
                <Paper className="tablePaper" sx={{ display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    width:{
                    xs:700,
                    sm:950,
                    md:1000,
                    lg:1220,
                    xl:1500
                }
                }}>
                    <div style={{ margin: '1%',display:'flex',justifyContent:'flex-end',width:'60%' }}>
                        <Button sx={{alignSelf:'flex-end'}} onClick={functionadd} variant="contained">Add New (+)</Button>
      </div>
                    <div style={{ margin: '1%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center' }}>
                        <TableContainer  sx={{ display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center', width:{
                    xs:500,
                    sm:600,
                    md:800,
                    lg:900,
                    xl:1000
                }}}>
                            <Table className='tablemain'>
                                <TableHead>
                                    <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                        {columns.map((column) =>
                                            <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                        )}
                                    </TableRow>

                                </TableHead>
                                <TableBody>
                                    {props.userstate.userlist &&
                                        props.userstate.userlist
                                            .slice(page * rowperpage, page * rowperpage + rowperpage)
                                            .map((row, i) => {
                                                return (
                                                    <TableRow key={i}>
                                                        <TableCell>{row.id}</TableCell>
                                                        <TableCell>{row.name}</TableCell>
                                                        <TableCell>{row.username}</TableCell>
                                                        <TableCell>{row.email}</TableCell>
                                                        <TableCell>{row.role}</TableCell>
                                                        <TableCell>
                                                            <Button sx={{
                                                                width:{
                                                                    xs:10,
                                                                    sm:15,
                                                                    md:20,
                                                                    lg:30,
                                                                    xl:50
                                                                   },
                                                                height:{
                                                                    xs:10,
                                                                    sm:15,
                                                                    md:20,
                                                                    lg:30,
                                                                    xl:50
                                                                }
                                                            }} onClick={e => { handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                            <Button sx={{
                                                                width:{
                                                                    xs:10,
                                                                    sm:15,
                                                                    md:20,
                                                                    lg:30,
                                                                    xl:50
                                                                   },
                                                                height:{
                                                                    xs:10,
                                                                    sm:15,
                                                                    md:20,
                                                                    lg:30,
                                                                    xl:50
                                                                }
                                                            }} onClick={e => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>

                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            sx={{ width:{
                                xs:500,
                                sm:600,
                                md:700,
                                lg:800,
                                xl:1000
                            }}}
                            rowsPerPageOptions={[2, 5, 10, 20]}
                            rowsPerPage={rowperpage}
                            page={page}
                            count={props.userstate.userlist.length}
                            component={'div'}
                            onPageChange={handlepagechange}
                            onRowsPerPageChange={handlerowperpagechange}
                        >

                        </TablePagination>
                    </div>
                </Paper>

                <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
                    <DialogTitle>
                        <span>{title}</span>
                        <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <form onSubmit={handlesubmit}>
                            <Stack spacing={2} margin={2}>
                                <TextField required error={name.length === 0} value={name} onChange={e => { setname(e.target.value) }} variant="outlined" label="Name"></TextField>
                                <TextField required error={name.length === 0} value={username} onChange={e => { setusername(e.target.value) }} variant="outlined" label="Username"></TextField>
                                <TextField required error={Boolean(emailerror)} helperText={emailerror}value={email} onChange={e =>handleemail(e)} variant="outlined" label="Email"></TextField>
                                <RadioGroup value={role} onChange={e => { setrole(e.target.value) }} row>
                                    <FormControlLabel value="User" control={<Radio color="success"></Radio>} label="User"></FormControlLabel>
                                    <FormControlLabel value="Admin" control={<Radio></Radio>} label="Admin"></FormControlLabel>
                                </RadioGroup>
                                <FormControlLabel checked={agreeterm} onChange={e => { agreetermchange(e.target.checked) }} control={<Checkbox></Checkbox>} label="Agree Terms & Conditions"></FormControlLabel>
                                <Button  disabled={!agreeterm} variant="contained" type="submit">Submit</Button>
                            </Stack>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
    );
}

const mapStatetoProps = (state) => {
    return {
        userstate: state.userreducer
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        loaduser: () => dispatch(GetAllUsers())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);