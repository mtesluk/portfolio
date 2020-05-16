import React from 'react';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';
import { config } from '../../config';
import { setToken } from '../../actions/token';
import { RegisterFormType } from '../../shared/interfaces/user';
import HttpService from '../../shared/services/HttpService';
import { notifySuccess } from '../../actions/notify';


interface FacebookDataPicture {
  height: number;
  is_silhouette: boolean;
  url: string;
  width: number;
}

interface FacebookPicture {
  data: FacebookDataPicture;
}

interface FacebookResponse {
  status: string;
  name: string;
  picture: FacebookPicture;
  id: string;
  accessToken: string;
  userID: string;
  expiresIn: 3945;
  signedRequest: string;
  graphDomain: 'facebook';
  data_access_expiration_time: number;
}

interface Props {
  setToken: (token: string) => void;
  handleClose: (logged: boolean) => void;
  notifySuccess: (msg: string) => void;
  setRegistration: (type: number) => void;
  fbCssClass: string;
}

export const FacebookComponent = (props: Props) => {
  const _httpService: HttpService = new HttpService();

  const responseFacebook = (responseFb: FacebookResponse) => {
    const url = config.endpoints.auth.exists_fb;
    _httpService.get(`${url}?fb_id=${responseFb.userID}`).then(response => {
      const exists = response.exists;
      if (exists) {
        props.setToken(responseFb.accessToken);
        props.notifySuccess('Now you are logged in!');
        props.handleClose(true);
      } else {
        props.setRegistration(RegisterFormType.FRAGMENTARY);
      }
    }).catch(err => {});
  }

  const componentClicked = () => {
  }

  const facebookData = (<FacebookLogin
    cssClass={props.fbCssClass}
    appId="3136029376407498"
    autoLoad={false}
    fields="name,picture,email"
    onClick={componentClicked}
    callback={responseFacebook} />
  );

  return (
      <div>{facebookData}</ div>
  )
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setToken: (token: string) => dispatch(setToken(token)),
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg)),
  };
};

export const Facebook = connect(null, mapDispatchToProps)(FacebookComponent);
