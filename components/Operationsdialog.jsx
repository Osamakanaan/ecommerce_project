import * as React from 'react';
import { TextField, Button } from '@material-ui/core';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';

const OperationsDialog = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [operations, setOperations] = React.useState([]);
  const [loginFailed, setLoginFailed] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = (ID) => {
    //todo: delete from the operations array(ID)

    axios.post("http://localhost:8080/removeoperations",{id:ID}).then((response) => {
            console.log(response.data);
            alert("deleted successfully");
          })
  }


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
            console.log(response2.data);
            //todo: alert if he has no operations .length<0
            setOperations(response2.data.res);
          })
        
        }else{
          if (response.data.success === 1) {
            axios.post("http://localhost:8080/getoperations",{username: username}).then((response3) => {
             //todo: alert if he has no operations
            setOperations(response3.data.res);
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
      <button
      type="button"
      style={{
      border: 'none',
      background: 'none',
      }}
      onClick={handleClickOpen}
      >
      Get my operations
      </button>
      <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth={loginFailed || operations.length > 0}
    maxWidth={loginFailed || operations.length > 0 ? 'md' : 'xs'}
  >
    <DialogTitle id="alert-dialog-title">{"Your operations"}</DialogTitle>
    <DialogContent>
      {loginFailed && <DialogContentText style={{color: "red"}}>Invalid username or password</DialogContentText>}
      {operations.length > 0 ? 
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
    <TableCell>{operation.username}</TableCell>
    <TableCell>{operation.amount}</TableCell>
    
    <TableCell>{operation.date}</TableCell>
    <TableCell>{operation.status}</TableCell>
    <TableCell>
      <Button style={{color: 'white', backgroundColor: 'red'} } onClick={() => handleDelete(operation.id)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
))}

          </TableBody>
        </Table>
        :
<div>
            <TextField
              style={{ width: "100%", marginBottom: 50 }}
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              style={{ width: "100%" }}
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>}
        </DialogContent>
        <DialogActions>
          {operations.length > 0 ?
            <Button style={{ color: "white", backgroundColor: "red" }} onClick={handleClose}>
              Cancel
            </Button>
            :
            <>
              <Button style={{ color: "white", backgroundColor: "red" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ color: "white", backgroundColor: "green" }} onClick={handleLogin}>
                Show operations
              </Button>
            </>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default OperationsDialog;
