import * as React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';

const alloperations = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [operations, setOperations] = React.useState([]);
  const [loginFailed, setLoginFailed] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOperations([]);
    setLoginFailed(false);
  };

  const handleLogin = () => {
    if (username != null && username != "" && password != null && password != "") {
      axios.post("http://localhost:8080/login", {
      username: username,
      password: password
      }).then((response) => {
        console.log(response);
      if(response.data.success === 2){
        axios.post("http://localhost:8080/getalloperations").then((response2) => {
          setOperations(response2.data.res);
        })
      
      }else{
        if (response.data.success === 1) {
          axios.post("http://localhost:8080/getoperations",{username: username}).then((response2) => {
          setOperations(response2.data.res);
        })
        }else{
          setLoginFailed(true);
        }
      
      }
      });
      } else {
      alert("please make sure the fields are not empty");
      }
      };
      
      return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {operations.map((operation) => (
  <TableRow key={operation._id}>
    <TableCell>{operation.name}</TableCell>
    <TableCell>{operation.amount}</TableCell>
    <TableCell>{operation.date}</TableCell>
    <TableCell>{operation.status ? "Completed" : "In Progress"}</TableCell>
    <TableCell>
      <Button style={{color: 'white', backgroundColor: 'red'}} onClick={() => handleDelete(operation._id)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
))}

          </TableBody>
        </Table>
        :
<div>
           
          </div>
        
      
    </div>
  );
};
export default alloperations;
