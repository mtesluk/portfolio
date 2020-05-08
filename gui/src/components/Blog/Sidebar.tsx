import React, { useState } from 'react';
import { connect } from 'react-redux';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './Sidebar.scss';

import { setOpenLoginDialog } from '../../actions/login-dialog';
import { User } from '../../interfaces/user';
import { resetToken } from '../../actions/token';
import { notifySuccess } from '../../actions/notify';
import { Link } from 'react-router-dom';



interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  resetToken: () => void;
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
  const [isNavHide, setNavHide] = useState(false);

  const handleLogin = () => {
    if (props.token) {
      props.resetToken();
      props.notifySuccess('Logout confirmed');
    } else {
      props.setOpenLoginDialog(true);
    }
  };

  const renderLoginButton = () => {
    return props.token ? "Logout" : "Login";
  };

  const renderLoginSVG = () => {
    return props.token ? <LockIcon fontSize="inherit" /> : <LockOpenIcon fontSize="inherit" />;
  };

  const renderDashboadNavLink = () => {
    return isNavHide ? "D" : "Dashboard";
  };

  const renderUsersNavLink = () => {
    return isNavHide ? "U" : "Users";
  };

  const renderSitesNavLink = () => {
    return isNavHide ? "S" : "Sites";
  };

  const renderAddNavLink = () => {
    return isNavHide ? "A" : "Add new entry";
  };

  const renderNav = () => {
    return (
      <div className={`blog-container__sidebar ${isNavHide ? "blog-container__sidebar--hide" : ""}`}>
        <div className="blog-container__top">
          <Link to="/" className="blog-container__logo">
            <div className="blog-container__logo-pic"></div>
            {!isNavHide ? <div className="blog-container__logo-name">Portfolio</div> : <div></div>}
          </Link>
          <div className="blog-container__navs">
            <div className=""><Link to="/blog" className="">{renderDashboadNavLink()}</Link></div>
            <div className=""><Link to="/blog/users" className="">{renderUsersNavLink()}</Link></div>
            <div className=""><Link to="/blog/sites" className="">{renderSitesNavLink()}</Link></div>
            <div className=""><Link to="/blog/add" className="">{renderAddNavLink()}</Link></div>
          </div>
        </div>
        <div className="blog-container__bottom">
          <div className="blog-container__login" onClick={() => handleLogin()}>
            {isNavHide ? renderLoginSVG() : renderLoginButton()}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="blog-container">
      {renderNav()}
      <div className="blog-container__content">
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
    resetToken: () => dispatch(resetToken())
  };
};

export const BlogSidebar = connect(mapStateToProps, mapDispatchToProps)(BlogSidebarComponent);