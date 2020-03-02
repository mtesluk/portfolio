import React, { useState } from 'react';


interface Props {
  registerType: null | 'full' | 'partial';
}

interface Account {
  username?: string;
  password?: string;
  email?: string;
}

export const RegisterForm = (props: Props) => {
  const [account, setAccount] = useState<Account>({})

  const getAdditionalFields = () => {
    return (
      <div>
        <input className="form__password" placeholder="Password"></input>
        <input className="form__password" placeholder="Password Confirmation"></input>
        <input className="form__email" placeholder="Email"></input>
      </div>
    )
  }
  return (
    <form className="form">
      <input className="form__username" placeholder="Username"></input>
      {props.registerType === 'full' ? getAdditionalFields() : <></>}
    </form>
  );
};
