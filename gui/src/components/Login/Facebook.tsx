import React from 'react';

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
  // state = {
  //     auth: false,
  //     name: '',
  //     picture: ''
  // };

  const responseFacebook = (response: FacebookResponse) => {
    props.onAuthenticated(response.userID, response.accessToken);
    console.log(response)
    // if(response.status !== 'unknown')
    // IF ACCOUNT IN DATABASE -> AUTH
      // this.setState({
      //     auth: true,
      //     name: response.name,
      //     picture: response.picture.data.url
      // });
    //IF NOT REDIRECT TO FORM WITH MORE DETAIL REGISTER
  }

  const componentClicked = () => {
  }

  const facebookData = (<FacebookLogin
    appId="3136029376407498"
    autoLoad={false}
    fields="name,picture,email"
    onClick={componentClicked}
    callback={responseFacebook} />
  );

  return (
      //   <div style={{
      //     width: '400px',
      //     margin: 'auto',
      //     background: '#f4f4f4',
      //     padding: '20px',
      //     color: '#000'
      // }}>
      //     <img src={this.state.picture} alt={this.state.name} />
      //     <h2>Welcome {this.state.name}!</h2>
      // </div>
      <div>{facebookData}</ div>
  )
};
