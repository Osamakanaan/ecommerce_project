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
import SignupDialog from './SignupDialog';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

//import axios from 'axios';
import { withRouter } from 'next/router'

const Logdialog = (props) => {
    const router = useRouter();
  console.log(props);
  const [Username, setUsername] = React.useState("");
  const [Password, setPassword] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true);
  };

  const closethis = () => {
    // remove username and password
      setOpen(false);
  };

  const handleLogin = () => {
    if (Username != null && Username != "" && Password != null && Password != "" ) {
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
      <button type="button" className="btn" onClick={handleClickOpen}>
        {props.type}
      </button>

      <Dialog
        open={open}
        onClose={handleLogin}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please login to complete the action"}
        </DialogTitle>
        <DialogContent>
          <TextField style={{width: "100%", marginBottom : 50}} label="Username" variant="outlined" value={Username} onChange={e => setUsername(e.target.value)}/>
          <br/>
          <TextField style={{width: '100%'}} label="Password" variant="outlined" value={Password} onChange={e => setPassword(e.target.value)} type="password" />

        </DialogContent>
        <DialogActions>
        <div>
              <SignupDialog type={"first time? sign up"}/>
            </div>
          <Button style={{color: 'white', backgroundColor: 'red'}} onClick={closethis}>Cancel</Button>
          <Button style={{color: 'white', backgroundColor: 'green'}}  onClick={handleLogin} autoFocus>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default Logdialog;
