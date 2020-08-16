import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.scss';


export class Dashboard extends React.Component {

  render() {
    return (
      <div className="dashboard">
          <div className="part part--1">
            <Link to="/blog" className="part__link link">
              <div className="part__quarter part__quarter--1">
                <div className="part__name part__name--1">
                  blog
                </div>
              </div>
            </Link>
          </div>
          <div className="part part--2">
            <Link to="/photos" className="part__link link">
              <div className="part__quarter part__quarter--2">
                <div className="part__name part__name--2">
                  photos
                </div>
              </div>
            </Link>
          </div>
          <div className="part part--3">
            <a href="https://wcwm.netlify.app/">
              <div className="part__quarter part__quarter--3">
                <div className="part__name part__name--3">
                  wcwm
                </div>
              </div>
            </a>
          </div>
          <div className="part part--4">
            <div className="part__bg-video">
              {/* <ReactPlayer url='containers/movies.mp4' className="part__bg-video--content" lopp playing muted controls/> */}
              <video className="part__bg-video--content" autoPlay muted loop>
                <source src="movie-dashboard.mp4" type="video/mp4"></source>
                <source src="movie-dashboard-2.webm" type="video/webm"></source>
                Sorry, your browser doesn't support embedded videos.
              </video>
              <div className="part__bg-video--gradient"></div>
            </div>
            <Link to="/movies" className="part__link link">
              <div className="part__quarter part__quarter--4">
                <div className="part__name part__name--4">
                  movies
                </div>
              </div>
            </Link>
          </div>
      </div>
    );
  }
};