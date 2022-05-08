import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';
import { useRegisterUserMutation } from './services/authApi';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const Register = ({ setLogoutUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  let history = useHistory();
  const [registerUser, { data, isError, error }] = useRegisterUserMutation();

  useEffect(() => {
    if (data && data.access_token) {
      localStorage.setItem(
        'login',
        JSON.stringify({
          userLogin: true,
          token: data.access_token,
        }),
      );
      setErrorMsg('');
      setEmail('');
      setPassword('');
      setLogoutUser(false);
      history.push('/');
    }

    if (isError) {
      setErrorMsg(error.data.message);
    }
  }, [data, isError]);

  const register = async (e) => {
    e.preventDefault();
    await registerUser({ email, password });
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <h2>Register Page</h2>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={register}
      >
        <TextField
          id="username"
          label="Username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          style={{ width: '100px' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
      <p>
        Already have an account then please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
