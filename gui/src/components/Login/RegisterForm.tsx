import React from 'react';
import { useForm, ErrorMessage } from "react-hook-form";
import axios from 'axios';


interface Props {
  registerType: null | 'full' | 'partial';
}

interface Account {
  username?: string;
  password?: string;
  passwordConfirmation?: string;
  email?: string;
}

export const RegisterForm = (props: Props) => {
  const {register, setValue, handleSubmit, errors} = useForm<Account>();

  const onSubmit = handleSubmit((data: Account) => {
    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = {type: '', message: 'Passwords must be the same!'};
    } else {
      axios.post('/api/v1/users', data).then(reponse => {

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
