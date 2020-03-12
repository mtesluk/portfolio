import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Facebook } from './Facebook';
import axios from 'axios';

import { notifySuccess, notifyError } from '../../actions/notify';
import { setToken } from '../../actions/token';
import { User } from '../../interfaces/user';
import { setUserData } from '../../actions/user';


interface Props {
  setToken: (token: string) => void;
  setUserData: (data: User) => void;
  handleClose: () => void;
  createAccount: () => void;
  notifySuccess: (msg: string) => void;
  notifyError: (msg: string) => void;
  setRegister: (type: string) => void;
}

interface State {
}

interface Credentials {
  username: string;
  password: string;
}

export const LoginFormComponent = (props: Props) => {
  const [credentials, setCredentials] = useState<Credentials>({username: '', password: ''})

  const setAuth = (token: string) => {
    props.setToken(token);
  }

  const handleAuthFacebook = (fb_id: string, token: string) => {
    props.setUserData({profile: {facebook_id: fb_id}});
    axios.get(`/api/v1/users/exist_fb_token/?fb_id=${fb_id}`).then(response => {
      const exists = response.data.exists;
      exists ? props.handleClose() : props.setRegister('partial');
    }).catch(err => {
      notifyError(err.response.data)
      console.log(err.response)
    })
    setAuth(token);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    axios.post('/api/v1/api-token-auth/', credentials).then(response => {
      if (response.status === 200) {
        props.setToken(response.data.token);
        props.handleClose();
        props.notifySuccess('Now you are logged in');
      } else {
        props.notifyError(response.data);
      }
    }).catch(err => {
      props.notifyError(err.response.data.non_field_errors);
    });
  }

  const onUsernameChange = (event: any) => {
    setCredentials({
      ...credentials,
      username: event.target.value
    });
  }

  const onPasswordChange = (event: any) => {
    setCredentials({
      ...credentials,
      password: event.target.value
    });
  }

  return (
    <div>
      <Facebook onAuthenticated={handleAuthFacebook} />
      <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
        <input placeholder="Username" className="login-form__username" onChange={(e) => onUsernameChange(e)}></input>
        <input type="password" placeholder="Password" className="login-form__password" onChange={(e) => onPasswordChange(e)}></input>
        <button type="submit">Login</button>
      </form>
      <button className="signup" onClick={(e) => props.setRegister('full')}>Sign up</button>
    </div>
    )
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setToken: (token: string) => dispatch(setToken(token)),
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg)),
    notifyError: (msg: string) => dispatch(notifyError(msg)),
    setUserData: (data: User) => dispatch(setUserData(data)),
  };
};

export const LoginForm = connect(null, mapDispatchToProps)(LoginFormComponent);