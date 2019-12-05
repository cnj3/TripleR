import React, { useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Typography, withStyles, IconButton } from '@material-ui/core'
import axios from 'axios';
import TimePicker from 'react-time-picker';
import CloseIcon from '@material-ui/icons/CloseRounded'

const styles = () => ({
    fullDiv: {
        width: '100%',
        height: '100%'
    },
    paper: {
        width: '60%',
        left: '20%',
        top: '30%',
        minWidth: '60%'
    }
})

const UpdateReservation = ({ classes, data, close }) => {


    const SERVER_ADDRESS = '10.192.129.122'
    // const SERVER_ADDRESS = '172.20.10.8'


    const [formOpen, setFormOpen] = useState(false)
    const [viewRequest, setViewRequest] = useState(false);
    const [showData, setShowData] = useState(true);
    const [requestID, setRequestID] = useState()
    const [dne, setDNE] = useState(false)
    const [editing, setEditing] = useState(false)
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [requestData, setRequestData] = useState({});

    const deleteRequest = () => {
        setShowData(false)
        
        axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/deleteRequest?request_id=${requestID}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }, 
            proxy: {
                host: {SERVER_ADDRESS},
                port: 8080
            }})
            .then(res => {
            //const posts = res.data.data.children.map(obj => obj.data);
            // console.log("hihihi")
            // console.log(res.data)
                if (res.data === 0) {
                    setDNE(!dne)
                }
            
            
            // this.setState({ posts });
            }).catch(error => {console.log(error)});
    }

    const displayData = () => {
        //API CALL TO GET DATA 

        axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/searchRequest?request_id=${requestID}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }, 
            proxy: {
                host: {SERVER_ADDRESS},
                port: 8080
            }})
            .then(res => {
            //const posts = res.data.data.children.map(obj => obj.data);
            // console.log("hihihi")
            // console.log(res.data + "basd;fajs;fjalskdjf")
            setRequestData(res.data)
            // console.log(requestData)
            // console.log(res.data)
            // this.setState({ posts });
        }).catch(error => {console.log(error)});
    }

    const handleViewRequest = () => {
        setViewRequest(!viewRequest)
        displayData();
    }

    const handleEditRequest = () => {
        setEditing(!editing)
        displayData();
    }

    const handleDoneEditing = () => {
        axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/updateMapping?request_id=${requestID}&building_name=${requestData.building_name}&room_num=${requestData.room_num}&date=${date}&start_time=${startTime}:00&end_time=${endTime}:00`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }, 
            proxy: {
                host: {SERVER_ADDRESS},
                port: 8080
            }})
            .then(res => {
            //const posts = res.data.data.children.map(obj => obj.data);
            // console.log("hihihi")
            console.log(res.data + "HIHIHIHIHIH")
            setRequestData(res.data)
            setEditing(!editing)
            // console.log(requestData)
            
            // this.setState({ posts });
        }).catch(error => {console.log(error)});
    }

    const handleStartTimeChange = time => {
        setStartTime(time);
      }
    
      const handleEndTimeChange = time => {
        setEndTime(time);
      }

    return (
        <div className={classes.fullDiv}>
            <Paper className={classes.paper}>
                <TextField
                    id="standard-basic"
                    label="Request ID"
                    margin="normal"
                    onChange={e => {setRequestID(e.target.value)}}
                />
                <Button onClick= {deleteRequest}>Delete</Button>
                <Button onClick={handleViewRequest}>View</Button>
                <Button onClick={handleEditRequest}>Edit</Button>
                <IconButton onClick={close}><CloseIcon /></IconButton>
                {dne && <Typography>Sorry that does not exist</Typography>}
                {formOpen ? 
                    <form>
                        <Typography>Info Info Info Info</Typography>
                    </form>:null}
                {viewRequest && showData ?
                    <Paper className={classes.root}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Building Name</TableCell>
                                    <TableCell align="right">Room Number</TableCell>
                                    <TableCell align="right">Room Capacity</TableCell>
                                    <TableCell align="right">Date Booked</TableCell>
                                    <TableCell align="right">Start Time</TableCell>
                                    <TableCell align="right">End Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{requestData.building_name}</TableCell>
                                    <TableCell align="right">{requestData.room_num}</TableCell>
                                    <TableCell align="right">{requestData.capacity}</TableCell>
                                    <TableCell align="right">{requestData.date ? requestData.date : ' '}</TableCell>
                                    <TableCell align="right">{requestData.start_time ? requestData.start_time : ' '}</TableCell>
                                    <TableCell align="right">{requestData.end_time ? requestData.end_time : ' '}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                  </Paper>
                : null}
                {editing && 
                    <>
                        <TextField
                            id="date"
                            type="date"
                            format={'MM/DD/YYYY'}
                            onChange={e => {setDate(e.target.value)}}
                        />
                        <TimePicker
                            onChange={handleStartTimeChange}
                            value={startTime}
                        />
                        <TimePicker
                            onChange={handleEndTimeChange}
                            value={endTime}
                        />
                        <Button onClick={handleDoneEditing}>Done</Button>
                    </>}
            </Paper>
        </div>
    )
}

export default withStyles(styles)(UpdateReservation)
