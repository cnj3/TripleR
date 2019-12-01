// import React, { useState, useEffect } from 'react';

// const ReservationModal = (open, building_name, room_num, capacity, startDate, startTime, endTime) => {
//     return (
//         <Modal
//             aria-labelledby="simple-modal-title"
//             aria-describedby="simple-modal-description"
//             open={open}
//             onClose={handleClose}
//         >
//         <div style={modalStyle} className={classes.paper}>
//           <h2 id="simple-modal-title">Reserve this room!</h2>
//           <Paper className={classes.root}>
//             <Table className={classes.table} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Building Name</TableCell>
//                   <TableCell align="right">Room Number</TableCell>
//                   <TableCell align="right">Room Capacity</TableCell>
//                   <TableCell align="right">Date Booked</TableCell>
//                   <TableCell align="right">Start Time</TableCell>
//                   <TableCell align="right">End Time</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow>
//                   <TableCell>{rowData.building_name}</TableCell>
//                   <TableCell align="right">{rowData.room_num}</TableCell>
//                   <TableCell align="right">{rowData.capacity}</TableCell>
//                   <TableCell align="right">{startDate ? startDate : ' '}</TableCell>
//                   <TableCell align="right">{startTime ? startTime : ' '}</TableCell>
//                   <TableCell align="right">{endTime ? endTime : ' '}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </Paper>
//           <p id="simple-modal-description">
//             Please fill out the following information and verify the existing fields.
//           </p>
//           {/* <form>
//           <div><label> */}
            
//               <TextField
//                 value={groupName}
//                 error ={groupName === 0 ? false : true }
//                 onChange={e => {setGroupName(e.target.value)}}
//                 label="RSO Name: "
//               />
//               <TextField
//                 value={userName}
//                 name="Name"
//                 hintText="Name"
//                 floatingLabelText="Name"
//                 error ={userName === 0 ? false : true }
//                 helperText={userName}
//                 onChange={e => {setUserName(e.target.value)}}
//                 label="Contact Name: "
//               />
//               <TextField
//                 value={userEmail}
//                 name="Email"
//                 hintText="Email"
//                 floatingLabelText="Email"
//                 error ={userEmail === 0 ? false : true }
//                 helperText={userEmail}
//                 onChange={e => {setUserEmail(e.target.value)}}
//                 label="Contact Person Email: "
//               />
              
//               <Button 
//                 disabled={!groupName || !userName || !userEmail}
//                 onClick={() => {
//                   // setSubmitData({building_name: rowData.building_name, room_num: rowData.room_num, capacity: rowData.capacity, sd: startDate, st: startTime, et: endTime, group_name: groupName, user_name: userName, user_email: userEmail})
//                   // // console.log(startDate)}}
                  
                  
//                     axios.get(`http://${SERVER_ADDRESS}:8080/Spring4/data/checkAvailability?building_name=${rowData.building_name}&room_num=${rowData.room_num}&date=${startDate}&start_time=${startTime}:00&end_time=${endTime}:00`, {
//                       headers: {
//                         'Access-Control-Allow-Origin': '*',
//                       }, 
//                       proxy: {
//                         host: {SERVER_ADDRESS},
//                         port: 8080
//                       }})
//                     .then(res => {
//                       //const posts = res.data.data.children.map(obj => obj.data);
//                       console.log("hihihi")
//                       console.log(res.data)
//                       setRequestID(res.data)
                      
//                       // this.setState({ posts });
//                     });
                  

//                   //setOpen(false)
//                 }}
//               >Submit</Button>
//               <Typography>{requestID}</Typography>
//         </div>
//       </Modal>
//     )
// }

// export default ReservationModal