import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import UserService from '../../../../shared/services/user.service';
import { notifySuccess } from '../../../../actions/notify';
import InputWidget from '../../../../shared/components/widgets/input/input';
import ButtonWidget from '../../../../shared/components/widgets/button/button';


interface ReduxDispatch {
  notifySuccess: (msg: string) => void;
}

interface Props extends ReduxDispatch {

}

const ChangePasswordComponent = (props: Props) => {
  const _service: UserService = new UserService();
  const {register, setValue, handleSubmit, errors} = useForm<Account>();

  const onSubmit = handleSubmit((data: Account) => {
    // _service.putUser(data).then(response => {
    //   props.notifySuccess('User data updated');
    // }).catch(err => {});
  });

  return (
    <form className="blog-change-password" onSubmit={onSubmit}>
      <div className="form-field">
        <InputWidget placeholder="Username" name="username" refe={register({required: false})}/>
      </div>
      <div className="form-field">
        <InputWidget placeholder="Email" name="email" refe={register({required: false})}/>
      </div>
      <ButtonWidget type={"submit"} text={"Update"}/>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg)),
  };
};

const ChangePassword = connect(null, mapDispatchToProps)(ChangePasswordComponent);

export default ChangePassword;