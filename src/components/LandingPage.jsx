import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import TimePicker from 'react-time-picker';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import NavigateNextIcon from '@material-ui/icons/NavigateNextRounded';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
import SearchIcon from '@material-ui/icons/SearchRounded'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, TextField } from '@material-ui/core'
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

const LandingPage = () => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [open, setOpen] = useState();
  const [rowData, setRowData] = useState({building_name: '', room_num: '', capacity: 0});
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState();
  const [openRequestID, setOpenRequestID] = useState(false);
  const [groupName, setGroupName] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [submitData, setSubmitData] = useState({});
  // const [state, setState] = useState({
    const [state] = useState({
    columns: [
      { title: 'Building Name', field: 'building_name' },
      { title: 'Room', field: 'room_num' },
      { title: 'Capacity', field: 'capacity', type: 'numeric' },
    ],
    data: [{"building_name":"Altgeld","room_num":"141","capacity":1},{"building_name":"Altgeld","room_num":"143","capacity":1},{"building_name":"Altgeld","room_num":"145","capacity":1},{"building_name":"Altgeld","room_num":"147","capacity":1},{"building_name":"Altgeld","room_num":"159","capacity":1},{"building_name":"Altgeld","room_num":"241","capacity":1},{"building_name":"Altgeld","room_num":"243","capacity":1},{"building_name":"Altgeld","room_num":"245","capacity":1},{"building_name":"Altgeld","room_num":"314","capacity":1},{"building_name":"Altgeld","room_num":"341","capacity":1},{"building_name":"Altgeld","room_num":"343","capacity":1},{"building_name":"Altgeld","room_num":"345","capacity":1},{"building_name":"Altgeld","room_num":"347","capacity":1},{"building_name":"Altgeld","room_num":"441","capacity":1},{"building_name":"Altgeld","room_num":"443","capacity":1},{"building_name":"Altgeld","room_num":"445","capacity":1},{"building_name":"Altgeld","room_num":"447","capacity":1},{"building_name":"Animal Sciences","room_num":"107","capacity":1},{"building_name":"Animal Sciences","room_num":"131","capacity":1},{"building_name":"Animal Sciences","room_num":"150","capacity":1},{"building_name":"Architecture","room_num":"120","capacity":1},{"building_name":"Architecture","room_num":"301","capacity":1},{"building_name":"Architecture","room_num":"302","capacity":1},{"building_name":"Armory","room_num":"101","capacity":1},{"building_name":"Armory","room_num":"134","capacity":1},{"building_name":"Armory","room_num":"136","capacity":1},{"building_name":"Armory","room_num":"137","capacity":1},{"building_name":"Armory","room_num":"143","capacity":1},{"building_name":"Armory","room_num":"144","capacity":1},{"building_name":"Armory","room_num":"145","capacity":1},{"building_name":"Armory","room_num":"146","capacity":1},{"building_name":"Armory","room_num":"147","capacity":1},{"building_name":"Armory","room_num":"148","capacity":1},{"building_name":"Armory","room_num":"182","capacity":1},{"building_name":"Armory","room_num":"241","capacity":1},{"building_name":"Armory","room_num":"242","capacity":1},{"building_name":"Armory","room_num":"243","capacity":1},{"building_name":"Armory","room_num":"255","capacity":1},{"building_name":"Armory","room_num":"328","capacity":1},{"building_name":"Armory","room_num":"329","capacity":1},{"building_name":"Armory","room_num":"330","capacity":1},{"building_name":"Armory","room_num":"331","capacity":1},{"building_name":"Armory","room_num":"333","capacity":1},{"building_name":"Armory","room_num":"370","capacity":1},{"building_name":"Armory","room_num":"384","capacity":1},{"building_name":"Armory","room_num":"386","capacity":1},{"building_name":"Armory","room_num":"429","capacity":1},{"building_name":"Armory","room_num":"430","capacity":1},{"building_name":"Armory","room_num":"432","capacity":1},{"building_name":"Bevier","room_num":"103","capacity":1},{"building_name":"Bevier","room_num":"108","capacity":1},{"building_name":"Bevier","room_num":"132","capacity":1},{"building_name":"Bevier","room_num":"166","capacity":1},{"building_name":"Bevier","room_num":"180","capacity":1},{"building_name":"Bevier","room_num":"242","capacity":1},{"building_name":"Bevier","room_num":"393","capacity":1},{"building_name":"Burrill","room_num":"124","capacity":1},{"building_name":"Burrill","room_num":"136","capacity":1},{"building_name":"Burrill","room_num":"140","capacity":1},{"building_name":"Ceramics","room_num":"214","capacity":1},{"building_name":"Ceramics","room_num":"218","capacity":1},{"building_name":"Chem Annex","room_num":"1024","capacity":1},{"building_name":"Davenport","room_num":"113","capacity":1},{"building_name":"Davenport","room_num":"132","capacity":1},{"building_name":"Davenport","room_num":"136","capacity":1},{"building_name":"Davenport","room_num":"169","capacity":1},{"building_name":"Davenport","room_num":"212","capacity":1},{"building_name":"Davenport","room_num":"214","capacity":1},{"building_name":"Davenport","room_num":"215","capacity":1},{"building_name":"Davenport","room_num":"312","capacity":1},{"building_name":"Davenport","room_num":"313","capacity":1},{"building_name":"Davenport","room_num":"329","capacity":1},{"building_name":"Davenport","room_num":"336","capacity":1},{"building_name":"DCL","room_num":"1310","capacity":1},{"building_name":"DCL","room_num":"1320","capacity":1},{"building_name":"DKH","room_num":"106","capacity":1},{"building_name":"DKH","room_num":"108","capacity":1},{"building_name":"DKH","room_num":"111","capacity":1},{"building_name":"DKH","room_num":"113","capacity":1},{"building_name":"DKH","room_num":"114","capacity":1},{"building_name":"DKH","room_num":"115","capacity":1},{"building_name":"DKH","room_num":"119","capacity":1},{"building_name":"DKH","room_num":"123","capacity":1},{"building_name":"DKH","room_num":"125","capacity":1},{"building_name":"DKH","room_num":"1310","capacity":1},{"building_name":"DKH","room_num":"1320","capacity":1},{"building_name":"DKH","room_num":"206","capacity":1},{"building_name":"DKH","room_num":"209","capacity":1},{"building_name":"DKH","room_num":"212","capacity":1},{"building_name":"DKH","room_num":"215","capacity":1},{"building_name":"DKH","room_num":"215B","capacity":1},{"building_name":"DKH","room_num":"219","capacity":1},{"building_name":"DKH","room_num":"222","capacity":1},{"building_name":"DKH","room_num":"223","capacity":1},{"building_name":"DKH","room_num":"307","capacity":1},{"building_name":"DKH","room_num":"310","capacity":1},{"building_name":"DKH","room_num":"312","capacity":1},{"building_name":"DKH","room_num":"317","capacity":1},{"building_name":"DKH","room_num":"322","capacity":1},{"building_name":"DKH","room_num":"325","capacity":1},{"building_name":"DKH","room_num":"326","capacity":1},{"building_name":"Education","room_num":"162","capacity":1},{"building_name":"Education","room_num":"166","capacity":1},{"building_name":"Education","room_num":"2","capacity":1},{"building_name":"Education","room_num":"323","capacity":1},{"building_name":"Education","room_num":"37","capacity":1},{"building_name":"Education","room_num":"382","capacity":1},{"building_name":"Education","room_num":"385","capacity":1},{"building_name":"Education","room_num":"389","capacity":1},{"building_name":"EH","room_num":"106B1","capacity":1},{"building_name":"EH","room_num":"106B3","capacity":1},{"building_name":"EH","room_num":"106B6","capacity":1},{"building_name":"EH","room_num":"106B8","capacity":1},{"building_name":"English","room_num":"104","capacity":1},{"building_name":"English","room_num":"108","capacity":1},{"building_name":"English","room_num":"113","capacity":1},{"building_name":"English","room_num":"115","capacity":1},{"building_name":"English","room_num":"119","capacity":1},{"building_name":"English","room_num":"123","capacity":1},{"building_name":"English","room_num":"125","capacity":1},{"building_name":"English","room_num":"127","capacity":1},{"building_name":"English","room_num":"1302","capacity":1},{"building_name":"English","room_num":"1306","capacity":1},{"building_name":"English","room_num":"131","capacity":1},{"building_name":"English","room_num":"135","capacity":1},{"building_name":"English","room_num":"149","capacity":1},{"building_name":"English","room_num":"150","capacity":1},{"building_name":"English","room_num":"156","capacity":1},{"building_name":"English","room_num":"160","capacity":1},{"building_name":"English","room_num":"2101","capacity":1},{"building_name":"English","room_num":"2233","capacity":1},{"building_name":"English","room_num":"2310","capacity":1},{"building_name":"English","room_num":"259","capacity":1},{"building_name":"English","room_num":"29","capacity":1},{"building_name":"English","room_num":"303","capacity":1},{"building_name":"English","room_num":"307","capacity":1},{"building_name":"English","room_num":"309","capacity":1},{"building_name":"English","room_num":"3117","capacity":1},{"building_name":"English","room_num":"3217","capacity":1},{"building_name":"English","room_num":"36","capacity":1},{"building_name":"English","room_num":"44","capacity":1},{"building_name":"English","room_num":"69","capacity":1},{"building_name":"Everitt","room_num":"1302","capacity":1},{"building_name":"Everitt","room_num":"1306","capacity":1},{"building_name":"Everitt","room_num":"2101","capacity":1},{"building_name":"Everitt","room_num":"2233","capacity":1},{"building_name":"Everitt","room_num":"2310","capacity":1},{"building_name":"Everitt","room_num":"3117","capacity":1},{"building_name":"Everitt","room_num":"3217","capacity":1},{"building_name":"FLB","room_num":"1018","capacity":1},{"building_name":"FLB","room_num":"1022","capacity":1},{"building_name":"FLB","room_num":"1024","capacity":1},{"building_name":"FLB","room_num":"1030","capacity":1},{"building_name":"FLB","room_num":"1032","capacity":1},{"building_name":"FLB","room_num":"1038","capacity":1},{"building_name":"FLB","room_num":"1040","capacity":1},{"building_name":"FLB","room_num":"1048","capacity":1},{"building_name":"FLB","room_num":"1110","capacity":1},{"building_name":"FLB","room_num":"1112","capacity":1},{"building_name":"FLB","room_num":"1118","capacity":1},{"building_name":"FLB","room_num":"1120","capacity":1},{"building_name":"FLB","room_num":"1126","capacity":1},{"building_name":"FLB","room_num":"1128","capacity":1},{"building_name":"FLB","room_num":"1134","capacity":1},{"building_name":"FLB","room_num":"1136","capacity":1},{"building_name":"FLB","room_num":"1140","capacity":1},{"building_name":"FLB","room_num":"G-18","capacity":1},{"building_name":"FLB","room_num":"G-20","capacity":1},{"building_name":"FLB","room_num":"G-24","capacity":1},{"building_name":"FLB","room_num":"G-30","capacity":1},{"building_name":"FLB","room_num":"G-32","capacity":1},{"building_name":"FLB","room_num":"G-36","capacity":1},{"building_name":"FLB","room_num":"G-46","capacity":1},{"building_name":"FLB","room_num":"G-48","capacity":1},{"building_name":"Foellinger Aud.","room_num":"Aud.","capacity":1},{"building_name":"Gregory Hall","room_num":"100","capacity":1},{"building_name":"Gregory Hall","room_num":"111","capacity":1},{"building_name":"Gregory Hall","room_num":"112","capacity":1},{"building_name":"Gregory Hall","room_num":"113","capacity":1},{"building_name":"Gregory Hall","room_num":"205","capacity":1},{"building_name":"Gregory Hall","room_num":"207","capacity":1},{"building_name":"Gregory Hall","room_num":"213","capacity":1},{"building_name":"Gregory Hall","room_num":"215","capacity":1},{"building_name":"Gregory Hall","room_num":"217","capacity":1},{"building_name":"Gregory Hall","room_num":"219","capacity":1},{"building_name":"Gregory Hall","room_num":"221","capacity":1},{"building_name":"Gregory Hall","room_num":"223","capacity":1},{"building_name":"Gregory Hall","room_num":"307","capacity":1},{"building_name":"Gregory Hall","room_num":"311","capacity":1},{"building_name":"Gregory Hall","room_num":"313","capacity":1},{"building_name":"Gregory Hall","room_num":"315","capacity":1},{"building_name":"Gregory Hall","room_num":"317","capacity":1},{"building_name":"Gregory Hall","room_num":"319","capacity":1},{"building_name":"Gregory Hall","room_num":"321","capacity":1},{"building_name":"Gregory Hall","room_num":"325","capacity":1},{"building_name":"Gregory Hall","room_num":"327","capacity":1},{"building_name":"Gregory Hall","room_num":"329","capacity":1},{"building_name":"Gregory Hall","room_num":"331","capacity":1},{"building_name":"Henry Admin","room_num":"137","capacity":1},{"building_name":"Henry Admin","room_num":"138","capacity":1},{"building_name":"Henry Admin","room_num":"140","capacity":1},{"building_name":"Henry Admin","room_num":"142","capacity":1},{"building_name":"Henry Admin","room_num":"143","capacity":1},{"building_name":"Henry Admin","room_num":"148","capacity":1},{"building_name":"Henry Admin","room_num":"149","capacity":1},{"building_name":"Henry Admin","room_num":"152","capacity":1},{"building_name":"Henry Admin","room_num":"154","capacity":1},{"building_name":"Henry Admin","room_num":"156","capacity":1},{"building_name":"Huff Hall","room_num":"112","capacity":1},{"building_name":"Huff Hall","room_num":"209","capacity":1},{"building_name":"Illini Hall","room_num":"1","capacity":1},{"building_name":"Illini Hall","room_num":"2","capacity":1},{"building_name":"Illini Hall","room_num":"7","capacity":1},{"building_name":"KAM","room_num":"62","capacity":1},{"building_name":"Library","room_num":"66","capacity":1},{"building_name":"Lincoln Hall","room_num":"1000","capacity":1},{"building_name":"Lincoln Hall","room_num":"1002","capacity":1},{"building_name":"Lincoln Hall","room_num":"1020","capacity":1},{"building_name":"Lincoln Hall","room_num":"1022","capacity":1},{"building_name":"Lincoln Hall","room_num":"1024","capacity":1},{"building_name":"Lincoln Hall","room_num":"1026","capacity":1},{"building_name":"Lincoln Hall","room_num":"1027","capacity":1},{"building_name":"Lincoln Hall","room_num":"1028","capacity":1},{"building_name":"Lincoln Hall","room_num":"1051","capacity":1},{"building_name":"Lincoln Hall","room_num":"1057","capacity":1},{"building_name":"Lincoln Hall","room_num":"1060","capacity":1},{"building_name":"Lincoln Hall","room_num":"1062","capacity":1},{"building_name":"Lincoln Hall","room_num":"1064","capacity":1},{"building_name":"Lincoln Hall","room_num":"1065","capacity":1},{"building_name":"Lincoln Hall","room_num":"1066","capacity":1},{"building_name":"Lincoln Hall","room_num":"1068","capacity":1},{"building_name":"Lincoln Hall","room_num":"1090","capacity":1},{"building_name":"Lincoln Hall","room_num":"1092","capacity":1},{"building_name":"Lincoln Hall","room_num":"Theater (1053)","capacity":1},{"building_name":"Loomis","room_num":"136","capacity":1},{"building_name":"Loomis","room_num":"137","capacity":1},{"building_name":"Loomis","room_num":"139","capacity":1},{"building_name":"Loomis","room_num":"141","capacity":1},{"building_name":"Loomis","room_num":"143","capacity":1},{"building_name":"Loomis","room_num":"144","capacity":1},{"building_name":"Loomis","room_num":"147","capacity":1},{"building_name":"Loomis","room_num":"151","capacity":1},{"building_name":"Loomis","room_num":"158","capacity":1},{"building_name":"MSEB","room_num":"100","capacity":1},{"building_name":"MSEB","room_num":"119","capacity":1},{"building_name":"MSEB","room_num":"305","capacity":1},{"building_name":"MSEB","room_num":"4101","capacity":1},{"building_name":"Mumford Hall","room_num":"103","capacity":1},{"building_name":"Mumford Hall","room_num":"313","capacity":1},{"building_name":"Mumford Hall","room_num":"316N","capacity":1},{"building_name":"Mumford Hall","room_num":"316S","capacity":1},{"building_name":"Mumford Hall","room_num":"320","capacity":1},{"building_name":"NHB","room_num":"2078","capacity":1},{"building_name":"NHB","room_num":"2079","capacity":1},{"building_name":"Noyes","room_num":"100","capacity":1},{"building_name":"Noyes","room_num":"161","capacity":1},{"building_name":"Noyes","room_num":"162","capacity":1},{"building_name":"Noyes","room_num":"163","capacity":1},{"building_name":"Noyes","room_num":"164","capacity":1},{"building_name":"Noyes","room_num":"165","capacity":1},{"building_name":"Noyes","room_num":"217","capacity":1},{"building_name":"NSRC","room_num":"149","capacity":1},{"building_name":"Psychology","room_num":"11","capacity":1},{"building_name":"Psychology","room_num":"17","capacity":1},{"building_name":"Psychology","room_num":"207","capacity":1},{"building_name":"Psychology","room_num":"21","capacity":1},{"building_name":"Psychology","room_num":"23","capacity":1},{"building_name":"Psychology","room_num":"29","capacity":1},{"building_name":"Psychology","room_num":"31","capacity":1},{"building_name":"Psychology","room_num":"32","capacity":1},{"building_name":"RAL","room_num":"116","capacity":1},{"building_name":"SHS","room_num":"110","capacity":1},{"building_name":"Siebel","room_num":"1103","capacity":1},{"building_name":"Siebel","room_num":"1105","capacity":1},{"building_name":"Siebel","room_num":"1109","capacity":1},{"building_name":"Siebel","room_num":"1111","capacity":1},{"building_name":"Siebel","room_num":"1131","capacity":1},{"building_name":"Siebel","room_num":"1214","capacity":1},{"building_name":"Siebel","room_num":"1302","capacity":1},{"building_name":"Siebel","room_num":"1304","capacity":1},{"building_name":"Siebel","room_num":"1404","capacity":1},{"building_name":"Talbot","room_num":"103","capacity":1},{"building_name":"Talbot","room_num":"104","capacity":1},{"building_name":"Talbot","room_num":"105","capacity":1},{"building_name":"Talbot","room_num":"225A","capacity":1},{"building_name":"THBH","room_num":"134","capacity":1},{"building_name":"Transportation","room_num":"101","capacity":1},{"building_name":"Transportation","room_num":"103","capacity":1},{"building_name":"Transportation","room_num":"112","capacity":1},{"building_name":"Transportation","room_num":"114","capacity":1},{"building_name":"Transportation","room_num":"203","capacity":1},{"building_name":"Transportation","room_num":"204","capacity":1},{"building_name":"Transportation","room_num":"206","capacity":1},{"building_name":"Transportation","room_num":"W109","capacity":1},{"building_name":"Transportation","room_num":"W115","capacity":1},{"building_name":"Turner","room_num":"W203","capacity":1},{"building_name":"Wohlers","room_num":"130","capacity":1},{"building_name":"Wohlers","room_num":"138","capacity":1},{"building_name":"Wohlers","room_num":"141","capacity":1},{"building_name":"Wohlers","room_num":"152","capacity":1},{"building_name":"Wohlers","room_num":"166","capacity":1},{"building_name":"Wohlers","room_num":"170","capacity":1},{"building_name":"Wohlers","room_num":"174","capacity":1},{"building_name":"Wohlers","room_num":"226","capacity":1},{"building_name":"Wohlers","room_num":"236","capacity":1},{"building_name":"Wohlers","room_num":"241","capacity":1},{"building_name":"Wohlers","room_num":"243","capacity":1},{"building_name":"Wohlers","room_num":"245","capacity":1}]
  });

  useEffect(() => {
    console.log(rowData.building_name + " " + rowData.room_num + " " + rowData.capacity + " " + startDate + " " + startTime + " " + endTime + " " + groupName + " " + userName + " " + userEmail)
    console.log("here")
    fetch("http://10.192.129.122:8080/Spring4/data/br")
    .then(res => res.json(),  console.log('oooo'))
    .then(
      (result) => {
        console.log("hi")
        console.log(result)
        setIsLoaded(true)
        setItems(result.items)
      },
      (error) => {
        console.log('why')
        console.log(error)
        setIsLoaded(true)
        // this.setState({
        //   isLoaded: true,
        //   error
        });
      }, []);


//       fetch("http://10.192.129.122:8080/Spring4/data/br", {
//   // mode: 'no-cors',
//   method: 'GET',
//   headers: {
//     Accept: 'application/json',
//   },
// },
// ).then(response => {
//   if (response.ok) {
//     response.json().then(json => {
//       console.log(json);
//     });
//   }
// });
    

    // axios.get(`http://10.192.129.122:8080/Spring4/data/br`, {
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   }, 
    //   proxy: {
    //     host: '10.192.129.122',
    //     port: 8080
    //   }})
    // .then(res => {
    //   //const posts = res.data.data.children.map(obj => obj.data);
    //   console.log(res)
    //   console.log("boooo")
    //   // this.setState({ posts });
    // });


  const callAPI = () => {
    axios.get(`http://10.192.129.122:8080/Spring4/data/br`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }, 
      proxy: {
        host: '10.192.129.122',
        port: 8080
      }})
    .then(res => {
      //const posts = res.data.data.children.map(obj => obj.data);
      console.log(res)
      console.log("boooo")
      // this.setState({ posts });
    });
  }

  const [modalStyle] = React.useState(getModalStyle);

  const handleDateChange = date => {
    console.log(date + "\n")
    setStartDate(date)
    console.log(startDate)
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
                  // console.log(rowData.building_name + " " + rowData.room_num + " " + rowData.capacity + " " + startDate + " " + startTime + " " + endTime + " " + groupName + " " + userName + " " + userEmail)
                  setSubmitData({building_name: rowData.building_name, room_num: rowData.room_num, capacity: rowData.capacity, sd: startDate, st: startTime, et: endTime, group_name: groupName, user_name: userName, user_email: userEmail})
                  setOpen(false)
                }}
              >Submit</Button>
        
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