import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { withRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '35ch',
      borderRadius: '5px',
      display: 'block',
      fontSize: '1.2rem',
    },
    '& .MuiFilledInput-underline:after': {
      borderColor: 'purple',
    },
    '& .MuiFormLabel-root': {
      color: 'purple',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submitButton: {
    margin: theme.spacing(1),
    backgroundColor: 'purple',
    color: 'white',
    '&:hover': {
      backgroundColor: '#6200ee',
    },
  },
  selectRoot: {
    '& .MuiSelect-root': {
      color: 'purple',
      borderRadius: '5px',
    },
  },
  inputBaseRoot: {
    '& .MuiInputBase-root': {
      color: 'purple',
      borderRadius: '5px',
    },
  },
  checkboxRoot: {
    '& .MuiCheckbox-root': {
      color: 'purple',
    },
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
}));





const SignupPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [specificLocation, setSpecificLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSpecificLocationChange = (event) => {
    setSpecificLocation(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleTermsAcceptedChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  const validateForm = () => {
    let valid = true;

    // Validate username
    if (!username) {
      valid = false;
    }

    // Validate email
    if (!email || !email.includes('@')) {
      valid = false;
    }

    // Validate password
    if (!password || password.length < 5 || !/\d/.test(password)) {
      valid = false;
    }

      // Validate phone number
  if (!phoneNumber || !/^\d{8}$/.test(phoneNumber)) {
    valid = false;
  }

  // Validate terms acceptance
  if (!termsAccepted) {
    valid = false;
  }

  setFormValid(valid);
};

return (
  <div className={classes.formWrapper}>
  <form className={classes.root } noValidate autoComplete="off">
    <div>
      <TextField
        id="username"
        label="Username"
        value={username}
        onChange={handleUsernameChange}
        required
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
    </div>
    <FormControl className={classes.formControl}>
      <InputLabel id="location-label">Location</InputLabel>
      <Select
        labelId="location-label"
        id="location"
        value={location}
        onChange={handleLocationChange}
        required
      >
        <MenuItem value="Beirut">Beirut</MenuItem>
        <MenuItem value="Bekaa">Bekaa</MenuItem>
        <MenuItem value="Zahle">Zahle</MenuItem>
        <MenuItem value="Tripoli">Tripoli</MenuItem>
        <MenuItem value="Tyre">Tyre</MenuItem>
        <MenuItem value="Sidon">Sidon</MenuItem>
      </Select>
    </FormControl>
    <TextField
      id="specific-location"
      label="Specific Location"
      value={specificLocation}
      onChange={handleSpecificLocationChange}
      required
    />
    <TextField
      id="phone-number"
      label="Phone Number"
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
      required
    />
    <div>
      <Checkbox
        checked={termsAccepted}
        onChange={handleTermsAcceptedChange}
        required
      />
      <span>I accept the terms and conditions</span>
    </div>
    <Button
      className={classes.submitButton}
      variant="contained"
      //disabled={!formValid}
      onClick={() => {
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
            router.push({
              pathname: '/',
              query: { logged: true }
          }, '/');
          }
          });
      }}
    >
      Submit  
    </Button>
  </form>
  </div>
);
}

export default SignupPage;
