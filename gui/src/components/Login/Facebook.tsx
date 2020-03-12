import React from 'react';

import './Facebook.scss';

import FacebookLogin from 'react-facebook-login';


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
  onAuthenticated: (fb_id: string, token: string) => void;
}

export const Facebook = (props: Props) => {

  const responseFacebook = (response: FacebookResponse) => {
    props.onAuthenticated(response.userID, response.accessToken);
  }

  const componentClicked = () => {
  }

  const facebookData = (<FacebookLogin
    cssClass="fb-btn"
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
