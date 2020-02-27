import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DehazeIcon from '@material-ui/icons/Dehaze';
import { CSSProperties } from '@material-ui/styles';
import './Blog.scss';

import AddForm  from './Add';
import Sites from './Sites';
import { Entry } from './Entry';
import { Users } from './Users';
import { Dashboard } from './Dashboard';
import { setOpenLoginDialog } from '../../actions/login-dialog';


interface Props {
  setOpenLoginDialog: (open: boolean) => void;
}

interface State {
  scrollDown: boolean,
  currTop: number,
}

export class BlogComponent extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      scrollDown: true,
      currTop: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const rect = document.body.getBoundingClientRect();
    if (this.state) {
      this.setState({
        ...this.state,
        scrollDown: rect.top > this.state.currTop,
        currTop: rect.top,
      })
    }
  }

  navFixedStyle(): CSSProperties {
    return {
      position: 'fixed',
      top: '0',
      left: '0',
    }
  }

  handleClickOpen() {
    this.props.setOpenLoginDialog(true);
  };

  renderNav() {
    return (
      <div className="blog__nav" style={this.state.currTop < -50 && this.state.scrollDown ? this.navFixedStyle() : {}}>
        <div className="blog__nav-inside">
          <div className="blog__nav--left">
            <p className="blog__nav--logo blog__nav--elem">
              <DehazeIcon />
            </p>
            <p className="blog__nav--logo blog__nav--elem">
              <Link to="/blog" className="blog__nav--link link">
                Blog
              </Link>
            </p>
            <p className="blog__nav--elem"><Link to="/blog/users" className="blog__nav--link link">Users</Link></p>
            <p className="blog__nav--elem"><Link to="/blog/sites" className="blog__nav--link link">Sites</Link></p>
          </div>
          <div className="blog__nav--right">
            <button onClick={() => this.handleClickOpen()} className="blog__nav--link link nav-button">Login</button>
            <Link to="/blog/add" className="blog__nav--link link"><div className="nav-button">Add new entry</div></Link>
          </div>
        </div>
      </div>
    )
  }

  renderContainer() {
    return (
      <div className="blog__container">
        <div className="blog__content">
          <Switch>
              <Route path="/blog" exact component={Dashboard} />
              <Route path="/blog/users" component={Users} />
              <Route path="/blog/add" component={AddForm} />
              <Route path="/blog/sites" component={Sites} />
              <Route path="/blog/:id" component={Entry} />
          </Switch>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="blog">
        {this.state.scrollDown ? this.renderNav() : <div></div>}
        {this.renderContainer()}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setOpenLoginDialog: (open: boolean) => dispatch(setOpenLoginDialog(open))
  };
};

export const Blog = connect(null, mapDispatchToProps)(BlogComponent);