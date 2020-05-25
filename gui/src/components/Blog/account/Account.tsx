import React from 'react';
import { connect } from 'react-redux';

import './Account.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';

import { Blog } from 'shared/interfaces/blog';
import { User } from 'shared/interfaces/user';
import ChangePassword from './changePassword/ChangePassword';
import EditProfile from './editProfile/EditProfile';
import Admin from './admin/Admin';


interface ComponentState {
  mostSeenBlogs: Blog[];
}

interface ReduxState {
  user: User;

}

interface Props extends ReduxState {

}

enum PanelCondition {
  isSuperuser=1,
}

interface PanelConfig {
  [name: string]: {component: React.ComponentClass | JSX.Element; condition?: PanelCondition}
}

const panels: PanelConfig = {
  'Edit profile': {
    component: <EditProfile />,
  },
  'Change password': {
    component: <ChangePassword />,
  },
  'Admin': {
    component: <Admin />,
    condition: PanelCondition.isSuperuser,
  },
};

const AccountComponent = (props: Props) => {

  const manageCondition = (cond: undefined | PanelCondition) => {
    switch (cond) {
      case PanelCondition.isSuperuser:
        return props.user.is_superuser;
      default:
        return true;
    }
  }

  return (
    <div className="blog-account">
      {Object.keys(panels).map((key: string, index: number) => {
        return manageCondition(panels[key].condition) ? <ExpansionPanel>
                <ExpansionPanelSummary
                  key={index}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel-content"
                >
                  {key}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {panels[key].component}
                </ExpansionPanelDetails>
              </ExpansionPanel> : <></>
      })}
    </div>
  );
};


const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.user,
  };
};

const Account = connect(mapStateToProps)(AccountComponent);
export default Account;
