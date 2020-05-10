import React from 'react';
import { Link } from 'react-router-dom';

import './SelectCardList.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import { config  } from '../../../config';
import HttpService from '../../../shared/services/HttpService'
import { Blog } from '../../../shared/interfaces/blog';


interface Props {
    endpoint: string;
    filters: {[filterName: string]: string | null};
    selector?: string;
};

interface Subject {
    id: number;
    name?: string;
}

interface Entity {
  subject: any;
  blogs: Blog[];
}

interface State {
  loading: boolean;
  subjects: any[];
  selectedEntity: Entity[];
}


class SelectCardList extends React.Component<Props, State> {
  _httpService: HttpService = new HttpService();
  state = {
    subjects: [],
    selectedEntity: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.getSubjects();
  }

  getSubjects() {
    const url = this.props.endpoint;
    const selector = this.props.selector;
    this._httpService.get(url).then(response => {
      const subjects: Subject[] = response.map(
        (subject: Subject | string, index: number) => ({id: (subject as Subject).id || index, name: selector ? subject[selector] : subject})
      );
      this.setState({
        subjects: subjects,
        loading: false,
      });
    }).catch(error => {
    })
  }

  getBlogs(subject: Subject) {
    const subjectBlogsExists = this.state.selectedEntity.map((entity: Entity) => entity.subject.id).includes(subject.id);
    if (!subjectBlogsExists) {
      const url = config.endpoints.blog.base;
      const filters = {};
      for (const key in this.props.filters) {
        filters[key] = this.props.filters[key] === 'id' ? subject.id : subject.name;
      }
      this._httpService.get(url, filters).then((response: Blog[]) => {
        const entity: Entity = {subject, blogs: response};
        const selectedEntity: Entity[] = [...this.state.selectedEntity, entity];
        this.setState({
          selectedEntity,
        });
      }).catch(error => {
      })
    }
    this.setState({
      loading: false,
    });
  }

  handleSubjectSelectChange(event) {
    this.setState({
      loading: true,
    });
    const id: number = Number(event.target.value);
    const subject: Subject = this.state.subjects.find((subject: Subject) => id === subject.id) || {id};
    this.getBlogs(subject);
  }

  handleRemoveSubjectBlogs(index: number) {
    const selectedEntity: Entity[] = [...this.state.selectedEntity];
    selectedEntity.splice(index, 1);
    this.setState({
      selectedEntity,
    });
  }

  renderBlogsCard(keyId: number, subject: Subject, blogs: Blog[]) {
    return (
      <Card className="blog-card-list__card" key={keyId}>
        <CardContent>
          <header className="blog-card-list__blogs-header">{subject.name || subject.id}</header>
          {blogs.map(blog => {
            return (
              <Link to={config.routes.blog.detail(blog.id)} className="blog-card-list__blogs-list-element" key={blog.id}>
                <ViewHeadlineIcon fontSize="inherit" />
                <div className="blog-card-list__blogs-list-element-text">{blog.title}</div>
              </Link>
            )
          })}
        </CardContent>
        <CardActions>
          <Button size="large" onClick={() => this.handleRemoveSubjectBlogs(keyId)}>Unpin</Button>
        </CardActions>
      </Card>
    )
  }

  renderMainCard() {
    return (
      <Card className="blog-card-list__card">
        <CardContent>
          {this.state.loading && <LinearProgress />}
          <select className="blog-card-list__select-subject" onChange={(e) => this.handleSubjectSelectChange(e)} value="-1">
            <option value="-1" disabled>Pick</option>
            {this.state.subjects.map((subject: Subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
          </select>
          <div className="blog-card-list__subjects-list">
            {this.state.selectedEntity.map((entity: Entity, index: number) => {
              return (
                <div key={index} className="blog-card-list__subjects-list-element">
                  <CheckIcon fontSize="inherit"/>
                  <div className="blog-card-list__subjects-list-element-text">{entity.subject.name}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    )
  }

  render() {
    return (
      <div className="blog-card-list">
        {this.renderMainCard()}
        {this.state.selectedEntity.map((entity: Entity, index: number) => this.renderBlogsCard(index, entity.subject, entity.blogs))}

      </div>
    );
  }
};

export default SelectCardList;