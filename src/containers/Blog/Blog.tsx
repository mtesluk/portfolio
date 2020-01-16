import React from 'react';
import './Blog.scss';


export class Blog extends React.Component {
    render() {
        return (
            <div className="containerr">
                <button>Add new entry</button>
                <div className="content">
                <button>Add new paragraph</button>
                <button>Add new image</button>
                </div>
            </div>
        )
    }
}