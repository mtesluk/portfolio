import React from 'react';
import './Blog.scss';
import { Link, Switch, Route } from 'react-router-dom';
import AddForm  from './Add';
import { Entry } from '../../components/Blog/Entry';
import { Users } from '../../components/Blog/Users';
import { Dashboard } from '../../components/Blog/Dashboard';
import Sites from '../../components/Blog/Sites';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { CSSProperties } from '@material-ui/styles';

interface Props {

}

interface State {
  scrollDown: boolean,
  currTop: number,
}

export class Blog extends React.Component <Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      scrollDown: true,
      currTop: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    console.log(this.state)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    const rect = document.body.getBoundingClientRect();
    console.log(this.state)
    console.log(rect)
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

  renderNav() {
    return (
      <div className="blog__nav" style={this.state.scrollDown && this.state.currTop < -300 ? this.navFixedStyle() : {}}>
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