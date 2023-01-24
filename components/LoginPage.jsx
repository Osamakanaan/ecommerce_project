import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'next/Link'
import  { SignupButton }  from './SignupButton';
import { useRouter } from 'next/router';
import axios from 'axios';

import { withRouter } from 'next/router'




const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    backgroundColor: 'purple',
    color: 'white',
    '&:hover': {
      backgroundColor: '#93A7F6',
    },
  },
}));

const LoginPage = (props) => {
  console.log(props.router);

  const classes = useStyles();
  const router = useRouter();

  const handleClick = () => {
    // perform login action here
    router.push('/signup');
  }
  const handle_click_login = () => {
    //console.log("hello world");
    if (Username != null && Username != "" && Password != null && Password != "" ) {
      axios.post("http://localhost:8080/login", {
        username: Username,
        password: Password
      }).then((response) => {
          //console.log(response.data);
          if (response.data.success == 1) {
            router.push({
              pathname: '/',
              query: { logged: true, Username:Username }
          }, '/');
          }else{
            alert("maybe you need to sign in first")
            router.push({
              pathname: '/signup',
              query: { logged: false }
          }, '/signup');
          }
        });
    }else {
      alert("please make sure the fields are not empty")
    }

  }
  const [Username, setUsername] = React.useState("");
  const [Password, setPassword] = React.useState("");
  return (
    <form className={classes.form}>
      <TextField label="Username" variant="outlined" value={Username} onChange={e => setUsername(e.target.value)}/>
      <TextField label="Password" variant="outlined" value={Password} onChange={e => setPassword(e.target.value)} type="password" />
      <Button className={classes.button} variant="contained" onClick={handle_click_login}>
        Login
      </Button>
      <Button className={classes.button} style={{
       color: 'purple',
       width: 500,
       backgroundColor: 'transparent',
       border: 'none',
       '&:hover': {
         color: '#6200ee',}

      }
    }
       variant="contained" onClick={handleClick}>
        Dont have an account? Signup
      </Button>



    </form>
  );

};


export default LoginPage;
