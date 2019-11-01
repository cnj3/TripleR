import React, { useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Typography} from '@material-ui/core'
import axios from 'axios';
import TimePicker from 'react-time-picker';


// const styles = withStyles( theme => ({
//     halloween: {

//     }
// }))

const UpdateReservation = ({ classes, data }) => {


    const SERVER_ADDRESS = '10.192.129.122'


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

    // const displayForm = () => {
    //     setFormOpen(true);
    // }

    const deleteRequest = () => {
        // console.log("delete it")
        // console.log(data)
        // console.log(requestID)
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
                setDNE(true)
            }
            
            
            // this.setState({ posts });
        });
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
            
            // this.setState({ posts });
        });
    }

    const handleViewRequest = () => {
        setViewRequest(true)
        displayData();
    }

    const handleEditRequest = () => {
        setEditing(true)
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
            // console.log(res.data + "HIHIHIHIHIH")
            setRequestData(res.data)
            // console.log(requestData)
            
            // this.setState({ posts });
        });
    }

    const handleStartTimeChange = time => {
        setStartTime(time);
      }
    
      const handleEndTimeChange = time => {
        setEndTime(time);
      }

    return (
        <>
            <Paper>
                <TextField
                    id="standard-basic"
                    label="Request ID"
                    margin="normal"
                    onChange={e => {setRequestID(e.target.value)}}
                />
                <Button onClick= {deleteRequest}>Delete</Button>
                <Button onClick={handleViewRequest}>View</Button>
                <Button onClick={handleEditRequest}>Edit</Button>
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
        </>
    )
}

export default UpdateReservation
