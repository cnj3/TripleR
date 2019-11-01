import React, { useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Typography } from '@material-ui/core'

// const styles = withStyles( theme => ({
//     halloween: {

//     }
// }))

const UpdateReservation = ({ classes, data }) => {

    const [formOpen, setFormOpen] = useState(false)
    const [viewRequest, setViewRequest] = useState(false);
    const [showData, setShowData] = useState(true);

    const displayForm = () => {
        setFormOpen(true);
    }

    const deleteRequest = () => {
        console.log("delete it")
        console.log(data)
        setShowData(false)
    }

    return (
        <>
            <Paper>
                <TextField
                    id="standard-basic"
                    label="Request ID"
                    margin="normal"
                />
                <Button onClick= {() => deleteRequest()}>Delete</Button>
                <Button onClick={() => {setViewRequest(true)}}>View</Button>
                <Button onClick={displayForm}>Edit</Button>
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
                                <TableCell align="right">Group Name</TableCell>
                                <TableCell align="right">Contact Name</TableCell>
                                <TableCell align="right">Contact Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                <TableCell>{data.building_name}</TableCell>
                                <TableCell align="right">{data.room_num}</TableCell>
                                <TableCell align="right">{data.capacity}</TableCell>
                                <TableCell align="right">{data.sd ? data.sd : ' '}</TableCell>
                                <TableCell align="right">{data.st ? data.st : ' '}</TableCell>
                                <TableCell align="right">{data.et ? data.et : ' '}</TableCell>
                                <TableCell align="right">{data.group_name ? data.group_name : ' '}</TableCell>
                                <TableCell align="right">{data.user_name ? data.user_name : ' '}</TableCell>
                                <TableCell align="right">{data.user_email ? data.user_email : ' '}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                  </Paper>
                : null}
            </Paper>
        </>
    )
}

export default UpdateReservation
