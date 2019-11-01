import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TimePicker from 'react-time-picker';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import SearchIcon from '@material-ui/icons/SearchRounded'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Typography } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import UpdateReservation from './UpdateReservation'

import axios from 'axios';

function getModalStyle() {
  return {
    width: 'fit-content'
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const LandingPage = ( ) => {


  const SERVER_ADDRESS = '10.192.129.122'


  const classes = useStyles();
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [open, setOpen] = useState();
  const [rowData, setRowData] = useState({building_name: '', room_num: '', capacity: 0});
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [items, setItems] = useState();
  const [openRequestID, setOpenRequestID] = useState(false);
  const [groupName, setGroupName] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  // const [submitData, setSubmitData] = useState({});
  const [submitData] = useState({});
  const [requestID, setRequestID] = useState();
  // const [state, setState] = useState({
  const [state, setState] = useState({
    columns: [],
    data: []
  });

  useEffect(() => {
        let columns = [
          { title: 'Building Name', field: 'building_name' },
          { title: 'Room', field: 'room_num' },
          { title: 'Capacity', field: 'capacity', type: 'numeric' },
        ]

        axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/br`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          }, 
          proxy: {
            host: {SERVER_ADDRESS},
            port: 8080
          }})
        .then(res => {
          //const posts = res.data.data.children.map(obj => obj.data);
          console.log(res.data)
          console.log("boooo")
          // setItems(res.data)
          setState({columns: columns, data: res.data})
          console.log(state)
          // this.setState({ posts });
        });

      }, []);

  const [modalStyle] = React.useState(getModalStyle);

  // const handleDateChange = date => {
  //   console.log(date + "\n")
  //   setStartDate(date)
  //   console.log(startDate)
  // };

  const handleStartTimeChange = time => {
    setStartTime(time);
  }

  const handleEndTimeChange = time => {
    setEndTime(time);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRequestID = () => {
    setOpenRequestID(true);
  }

  const handleCloseRequestID = () => {
    setOpenRequestID(false);
  }

  return (
    <>
      <Button onClick={handleOpenRequestID}>Input RequestID Here</Button>
      {/* <DatePicker
          value={startDate}
          onChange={handleDateChange}
          dayAriaLabel
      /> */}
      <TextField
        id="date"
        type="date"
        format={'MM/DD/YYYY'}
        onChange={e => {setStartDate(e.target.value)}}
      />
      <TimePicker
        onChange={handleStartTimeChange}
        value={startTime}
      />
      <TimePicker
        onChange={handleEndTimeChange}
        value={endTime}
      />
      <MaterialTable
        title="RSO Room Reserve"
        columns={state.columns}
        data={state.data}
        actions={[
          {
            icon: AddIcon,
            tooltip: 'Book Room',
            onClick: (event, data) => {
               if (startDate && startTime && endTime) {
                setOpen(true)
                setRowData(data)
               }
              
            }
          }
        ]}
        icons={{
          Search: SearchIcon,
          NextPage: ChevronRightIcon, 
          PreviousPage: ChevronLeftIcon,
          FirstPage: FirstPageIcon,
          LastPage: LastPageIcon,
          Clear: ClearIcon,
          SortArrow: ArrowUpwardIcon
        }}
        
      />
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Reserve this room!</h2>
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
                  <TableCell>{rowData.building_name}</TableCell>
                  <TableCell align="right">{rowData.room_num}</TableCell>
                  <TableCell align="right">{rowData.capacity}</TableCell>
                  <TableCell align="right">{startDate ? startDate : ' '}</TableCell>
                  <TableCell align="right">{startTime ? startTime : ' '}</TableCell>
                  <TableCell align="right">{endTime ? endTime : ' '}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <p id="simple-modal-description">
            Please fill out the following information and verify the existing fields.
          </p>
          {/* <form>
          <div><label> */}
            
              <TextField
                value={groupName}
                error ={groupName === 0 ? false : true }
                onChange={e => {setGroupName(e.target.value)}}
                label="RSO Name: "
              />
              <TextField
                value={userName}
                name="Name"
                hintText="Name"
                floatingLabelText="Name"
                error ={userName === 0 ? false : true }
                helperText={userName}
                onChange={e => {setUserName(e.target.value)}}
                label="Contact Name: "
              />
              <TextField
                value={userEmail}
                name="Email"
                hintText="Email"
                floatingLabelText="Email"
                error ={userEmail === 0 ? false : true }
                helperText={userEmail}
                onChange={e => {setUserEmail(e.target.value)}}
                label="Contact Person Email: "
              />
              
              <Button 
                disabled={!groupName || !userName || !userEmail}
                onClick={() => {
                  // setSubmitData({building_name: rowData.building_name, room_num: rowData.room_num, capacity: rowData.capacity, sd: startDate, st: startTime, et: endTime, group_name: groupName, user_name: userName, user_email: userEmail})
                  // // console.log(startDate)}}
                  
                  
                    axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/checkAvailability?building_name=${rowData.building_name}&room_num=${rowData.room_num}&date=${startDate}&start_time=${startTime}:00&end_time=${endTime}:00`, {
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                      }, 
                      proxy: {
                        host: {SERVER_ADDRESS},
                        port: 8080
                      }})
                    .then(res => {
                      //const posts = res.data.data.children.map(obj => obj.data);
                      console.log("hihihi")
                      console.log(res.data)
                      setRequestID(res.data)
                      
                      // this.setState({ posts });
                    });
                  

                  //setOpen(false)
                }}
              >Submit</Button>
              <Typography>{requestID}</Typography>
        </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openRequestID}
        onClose={handleCloseRequestID}>
          <UpdateReservation 
            classes={classes}
            data = {submitData}
          />
      </Modal>
    </>
  );
}

export default LandingPage