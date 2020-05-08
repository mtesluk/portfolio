import React from 'react';
import { useForm, ErrorMessage } from "react-hook-form";
import axios from 'axios';
import { connect } from 'react-redux';

import './RegisterForm.scss';

import { notifySuccess } from '../../actions/notify';
import { setOpenLoginDialog } from '../../actions/login-dialog';
import { User, Profile } from '../../interfaces/user';
import { setUserData } from '../../actions/user';
import { config  } from "../../config";


interface Props {
  user: User;
  registerType: null | 'full' | 'partial';
  setOpenLoginDialog: (open: boolean) => void;
  setUserData: (userData?: any) => void;
  notifySuccess: (msg: string) => void;
  setRegister: (register: boolean | null) => void;
}

interface State {
  user: User;
}

interface Account {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
  email?: string;
  profile?: Profile;
}

export const RegisterFormComponent = (props: Props) => {
  const {register, setValue, handleSubmit, errors} = useForm<Account>();

  const onSubmit = handleSubmit((data: Account) => {
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = {type: '', message: 'Passwords must be the same!'};
    } else {
      data = {...data, profile: {facebook_id: props.user.profile?.facebook_id}};
      axios.post(config.endpoints.auth.register, data).then(reponse => {
        handleRegistered(reponse);
        props.notifySuccess('Register successfully!')
      }).catch(err => {

      })
    }
  });

  const handleRegistered = (response: any) => {
    if (props.registerType === 'partial') {
      props.setOpenLoginDialog(false);
      props.setUserData(response.data);
    }
    props.setRegister(null);
  }

  const getAdditionalFields = () => {
    return (
      <div className="register-form__additional-fields">
        <div className="form-field">
          <input className="register-form__password" type="password" placeholder="Password" name="password" ref={register({required: true})} />
        </div>
        <ErrorMessage errors={errors} name="password" message='Password is required!' />
        <div className="form-field">
          <input className="register-form__password" type="password" placeholder="Password Confirmation" name="passwordConfirmation" ref={register({required: true})} />
        </div>
        <ErrorMessage errors={errors} name="passwordConfirmation" message='Password confirmation is required!' />
        {errors.passwordConfirmation && 'dsa'}
        <div className="form-field">
          <input className="register-form__email" type="email" placeholder="Email" name="email" ref={register({required: true})} />
        </div>
        <ErrorMessage errors={errors} name="email" message='Email confirmation is required!' />
      </div>
    )
  }
  return (
    <form className="register-form" onSubmit={onSubmit}>
      <div className="form-field">
        <input className="register-form__username" placeholder="Username" name="username" ref={register({required: true})} />
      </div>
      <ErrorMessage errors={errors} name="username" message='Username is required!' />

      {props.registerType === 'full' ? getAdditionalFields() : <></>}
      <div className="register-form__actions">
        <button type="button" onClick={(e) => props.setRegister(null)}>Back</button>
        <button type="submit">Register</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg)),
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open)),
    setUserData: (userData: User) => dispatch(setUserData(userData)),
  };
};

export const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent);