import React, { useState } from 'react';
import MaterialTable from 'material-table';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SearchIcon from '@material-ui/icons/SearchRounded'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import UpdateReservation from './UpdateReservation'


import "react-datepicker/dist/react-datepicker.css";



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
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

export default function MaterialTableDemo() {
  const classes = useStyles();
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [open, setOpen] = useState();
  const [rowData, setRowData] = useState({name: '', room: '', cap: 0});
  const [openRequestID, setOpenRequestID] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'Building Name', field: 'name' },
      { title: 'Room', field: 'room' },
      { title: 'Capacity', field: 'cap', type: 'numeric' },
    ],
    data: [
      { name: 'Wohlers', room: '110', cap: 10 },
      {
        name: 'English Building',
        room: '105',
        cap: 30
      },
      {
        name: 'Lincoln Hall',
        room: '196',
        cap: 20
      },
    ],
  });

  const [modalStyle] = React.useState(getModalStyle);

  const handleDateChange = date => {
    setStartDate(date)
  };

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
      <DatePicker
          selected={startDate}
          onChange={handleDateChange}
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
            tooltip: 'Save User',
            onClick: (event, data) => {
                setOpen(true)
                setRowData(data)
              
            }
          }
        ]}
        icons={{
          Search: SearchIcon,
          NextPage: ChevronRightIcon, 
          PreviousPage: ChevronLeftIcon,
          FirstPage: FirstPageIcon,
          LastPage: LastPageIcon
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
                  <TableCell>{rowData.name}</TableCell>
                  <TableCell align="right">{rowData.room}</TableCell>
                  <TableCell align="right">{rowData.cap}</TableCell>
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
          <form>
          <div><label>
              RSO Name:
              <input type="text" name="name" />
              </label></div>
              <div>
              <label>
              Contact Name:
              <input type="text" name="name" />
              </label> </div> 
              <div> 
              <label>
              Contact Person Email:
              <input type="text" name="name" />
              </label> </div>
              <input type="submit" value="Submit" />
          </form>
        </div>
      </Modal>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openRequestID}
        onClose={handleCloseRequestID}>
          <UpdateReservation />
      </Modal>
    </>
  );
}