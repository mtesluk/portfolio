import React, { useState } from 'react';
import { useForm, ErrorMessage } from "react-hook-form";
import { connect } from 'react-redux';

import './RegisterForm.scss';

import { notifySuccess } from '../../actions/notify';
import { User, Profile, RegisterFormType } from '../../shared/interfaces/user';
import { config  } from "../../config";
import HttpService from '../../shared/services/HttpService'


interface Props {
  user: User;
  registerType: number;
  notifySuccess: (msg: string) => void;
  setRegistration: (register: number) => void;
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
  const _httpService: HttpService = new HttpService();
  const [validationError, setValidationError] = useState<{valid: boolean, msg: string}>({valid: true, msg: "Passwords must be the same"});
  const {register, setValue, handleSubmit, errors} = useForm<Account>();

  const onSubmit = handleSubmit((data: Account) => {
    if (data.password !== data.passwordConfirmation) {
      setValidationError({
        ...validationError,
        valid: false
      });
      setTimeout(() => setValidationError({
        ...validationError,
        valid: true,
      }), 4000)
    } else {
      delete data.passwordConfirmation;
      data = {...data, profile: {facebook_id: props.user.profile?.facebook_id}};
      const url = config.endpoints.auth.register
      _httpService.post(url, data).then(reponse => {
        props.setRegistration(RegisterFormType.NONE);
        props.notifySuccess('Register successfully! Login again to authenticate yourself')
      }).catch(err => {

      })
    }
  });

  const renderAdditionalFields = () => {
    return (
      <div className="register-form__additional-fields">
        <div className="form-field">
          <input className="register-form__password" type="password" placeholder="Password" name="password" ref={register({required: true})} />
        </div>
        <div className="register-form__error">
          {errors.password ? "Password is required!" : ""}
        </div>
        <div className="form-field">
          <input className="register-form__password" type="password" placeholder="Password Confirmation" name="passwordConfirmation" ref={register({required: true})} />
        </div>
        <div className="register-form__error">
          {errors.passwordConfirmation ? "Password confirmation is required!" : ""}
        </div>
        <div className="register-form__error">
          {validationError.valid ? "" : validationError.msg}
        </div>
        <div className="form-field">
          <input className="register-form__email" type="email" placeholder="Email" name="email" ref={register({required: true})} />
        </div>
        <div className="register-form__error">
          {errors.email ? "Email is required!" : ""}
        </div>
      </div>
    )
  }

  const renderBasicFields = () => {
    return (
      <div className="register-form__basic-fields">
        <div className="form-field">
          <input className="register-form__username" placeholder="Username" name="username" ref={register({required: true})} />
        </div>
        <div className="register-form__error">
          {errors.username ? "Username is required!" : ""}
        </div>
      </div>
    )
  }

  const renderActions = () => {
    return (
      <div className="register-form__actions">
        <button type="button" onClick={(e) => props.setRegistration(RegisterFormType.NONE)}>Back</button>
        <button type="submit">Register</button>
      </div>
    )
  }

  return (
    <form className="register-form" onSubmit={onSubmit}>
      {renderBasicFields()}
      {props.registerType === RegisterFormType.FULL ? renderAdditionalFields() : <></>}
      {renderActions()}
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
  };
};

export const RegisterForm = connect(mapStateToProps, mapDispatchToProps)(RegisterFormComponent);