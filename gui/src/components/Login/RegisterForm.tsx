import React from 'react';
import { useForm, ErrorMessage } from "react-hook-form";
import axios from 'axios';
import { connect } from 'react-redux';

import { notifySuccess } from '../../actions/notify';
import { setOpenLoginDialog } from '../../actions/login-dialog';
import { Profiler } from 'inspector';
import { User } from '../../interfaces/user';


interface Props {
  user: User;
  registerType: null | 'full' | 'partial';
  initialData: Profile;
  setOpenLoginDialog: (open: boolean) => void;
  handleClose: (back?: boolean) => void;
  notifySuccess: (msg: string) => void;
}

interface State {
  user: User;
}

interface Profile {
  facebook_id: string;
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
    data.profile = {
      facebook_id: props.user.facebook_id
    };
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = {type: '', message: 'Passwords must be the same!'};
    } else {
      axios.post('/api/v1/users/', data).then(reponse => {
        // props.registerType === 'full' ? props.handleClose(true) : props.setOpenLoginDialog(false); props.handleClose();
        props.notifySuccess('Register successfully!')
      }).catch(err => {

      })
    }
    console.log(data);
  });

  const getAdditionalFields = () => {
    return (
      <div>
        <input className="form__password" type="password" placeholder="Password" name="password" ref={register({required: true})} />
        <ErrorMessage errors={errors} name="password" message='Password is required!' />
        <input className="form__password" type="password" placeholder="Password Confirmation" name="passwordConfirmation" ref={register({required: true})} />
        <ErrorMessage errors={errors} name="passwordConfirmation" message='Password confirmation is required!' />
        {errors.passwordConfirmation && 'dsa'}
        <input className="form__email" type="email" placeholder="Email" name="email" ref={register({required: true})} />
        <ErrorMessage errors={errors} name="email" message='Email confirmation is required!' />
      </div>
    )
  }
  return (
    <form className="form" onSubmit={onSubmit}>
      <input className="form__username" placeholder="Username" name="username" ref={register({required: true})} />
      <ErrorMessage errors={errors} name="username" message='Username is required!' />

      {props.registerType === 'full' ? getAdditionalFields() : <></>}
      <button type="submit">Register</button>
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
  };
};

export const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent);