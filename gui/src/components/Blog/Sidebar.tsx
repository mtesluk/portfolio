import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Sidebar.scss';

import { config } from '../../config';
import { setOpenLoginDialog } from '../../actions/login-dialog';
import { User } from '../../shared/interfaces/user';
import { resetToken } from '../../actions/token';
import { notifySuccess } from '../../actions/notify';
import { setUserData } from '../../actions/user';



interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  resetToken: () => void;
  setUserData: (data: User) => void;
  notifySuccess: (msg: string) => void;
  user: User;
  token: string;
  children: any;
}

interface State {
  user?: User;
  token?: string;
}

const BlogSidebarComponent = (props: Props) =>  {
  const handleLogin = () => {
    if (props.token) {
      props.resetToken();
      props.setUserData({});
      props.notifySuccess('Logout confirmed');
    } else {
      props.setOpenLoginDialog(true);
    }
  };

  const renderLoginButton = () => {
    return props.token ? "Logout" : "Login";
  };

  const renderNav = () => {
    return (
      <div className="blog__sidebar">
        <div className="blog__top">
          <Link to="/" className="blog__name">Blog</Link>
          <div className="blog__navs">
            <Link to={config.routes.blog.dashboard} className="">Dashboard</Link>
            <Link to={config.routes.blog.authors} className="">Authors</Link>
            <Link to={config.routes.blog.sites} className="">Sites</Link>
            <Link to={config.routes.blog.addNew} className="">Add blog</Link>
          </div>
        </div>
        <div className="blog__bottom">
          <div className="blog__login" onClick={() => handleLogin()}>
            {renderLoginButton()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog">
      {renderNav()}
      <div className="blog__main">
        {props.children}
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    user: state.user,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open)),
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg)),
    resetToken: () => dispatch(resetToken()),
    setUserData: (data: User) => dispatch(setUserData(data)),
  };
};

export const BlogSidebar = connect(mapStateToProps, mapDispatchToProps)(BlogSidebarComponent);