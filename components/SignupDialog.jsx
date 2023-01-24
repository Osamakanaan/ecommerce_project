import * as React from 'react';
import {TextField, Button} from '@material-ui/core';
import {Dialog} from '@material-ui/core';
import {DialogActions} from '@material-ui/core';
import {DialogContent} from '@material-ui/core';
import {DialogContentText} from '@material-ui/core';
import {DialogTitle} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Select, MenuItem } from '@material-ui/core';


import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import { useState } from 'react'; 
//import axios from 'axios';
import { withRouter } from 'next/router'

const SignupDialog = (props) => {
    const router = useRouter();
  console.log(props);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const closethis = () => {
    // remove username and password
      setOpen(false);
  };

  const handleLogin = () => {
    if (username != null && username != "" && password != null && password != "" ) {
      axios.post("http://localhost:8080/login", {
        username: Username,
        password: Password
      }).then((response) => {
          //console.log(response.data);
          if (response.data.success == 1) {
            axios.post("http://localhost:8080/addoperation", {
              username: Username,
              date: new Date().toISOString(),
              id: Username + "buy" + new Date().toISOString(),
              status: "in progress",
              amount: props.amount,
              items: props.items,
              typeofpayment: props.type
            }).then(async (response2) => {
                //console.log(response2.data);
                if (response2.data.success == 1) {
                  if (props.type == "Pay with stripe") {
                    // this is when he payes with stripe we will take him to stripe
                    const stripe = await getStripe();

                    const response3 = await fetch('/api/stripe', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(props.items),
                    });

                    if(response3.statusCode === 500) return;

                    const data = await response3.json();

                    toast.loading('Redirecting...');

                    stripe.redirectToCheckout({ sessionId: data.id });


                  }else {
                    // this is cash o delivery after the operation is add then rout him to sucess page
                      router.push({
                        pathname: '/success'
                    }, '/success');
                  }
                }
            });

          }else{
            alert("User informations are wrong ")
          }
        });
    }else {
      alert("please make sure the fields are not empty")
    }

    setOpen(false);
  };



  return (
    <div>
      <button type="button" className="btnsign" onClick={handleClickOpen}>
        {props.type}
      </button>

      <Dialog
        open={open}
        onClose={handleLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please signup to complete the action"}
        </DialogTitle>
        <DialogContent>
          <TextField style={{width: "100%", marginBottom : 25}} label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)}/>
          <br/>
          <TextField style={{width: '100%', marginBottom : 25}} label="Password" variant="outlined" value={password} onChange={e => setPassword(e.target.value)} type="password" />
          <br/>
          <TextField style={{width: '100%', marginBottom : 25}} label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)} type="email" />
          <br/>
          <Select 
      style={{width: '100%', marginBottom : 25}} 
      label="Location" 
      variant="outlined" 
      value={location} 
      onChange={e => setLocation(e.target.value)}
      type="location"
    >
      <MenuItem value="Bekaa">Bekaa</MenuItem>
      <MenuItem value="Beirut">Beirut</MenuItem>
      <MenuItem value="Tripoli">Tripoli</MenuItem>
      <MenuItem value="Zahle">Zahle</MenuItem>
      <MenuItem value="Sidon">Sidon</MenuItem>
      <MenuItem value="Tyre">Tyre</MenuItem>
    </Select>
          <br/>
          <TextField style={{width: '100%', marginBottom : 25}} label="specific location" variant="outlined" value={specificLocation} onChange={e => setSpecificLocation(e.target.value)} type="Specific Location" />
          <br/>
          <TextField style={{width: '100%', marginBottom : 25}} label="phone number" variant="outlined" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} type="Phone number" />
        </DialogContent>
        <DialogActions>
          
          <Button style={{color: 'white', backgroundColor: 'red'}} onClick={closethis}>Cancel</Button>
          <Button style={{color: 'white', backgroundColor: 'green'}}  onClick={() => {
        // Navigate to main page
        //console.log(username);
        var user = {}
        user.username = username;
        user.email = email;
        user.password = password;
        user.location = location;
        user.specificLocation = specificLocation;
        user.phoneNumber = phoneNumber;
        user.username = username;
        axios.post("http://localhost:8080/register", user).then((response) => {
          //console.log(response.data);
          if (response.data.success == 1) {
            //console.log("inserted");
            closethis(true);
          }
          });
      }} autoFocus>Signup</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default SignupDialog;
