import React from 'react';
import { Link } from 'react-router-dom';

import './SelectCardList.scss';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';

import { config  } from '../../../config';
import HttpService from '../../../shared/services/HttpService'
import { Blog } from '../../../shared/interfaces/blog';
import { SelectWidget } from 'widgets';


interface Props {
    endpoint: string;
    filters: {[filterName: string]: string | null};
    selector?: string;
    initData?: any[];
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
  private _httpService: HttpService = new HttpService();
  state = {
    subjects: [],
    selectedEntity: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    const initData = this.props.initData;
    if (initData) {
      const subjects: Subject[] = this.mapSubjects(initData, this.props.selector)
      subjects.forEach((subject: Subject) => this.getBlogs(subject));
    }
    this.getSubjects()
  }

  getSubjects() {
    const url = this.props.endpoint;
    const selector = this.props.selector;
    this._httpService.get(url).then(response => {
      const subjects: Subject[] = this.mapSubjects(response, selector)
      this.setState({
        subjects: subjects,
        loading: false,
      });
    }).catch(error => {
    })
  }

  mapSubjects(subjects: any, selector: string | undefined) {
    return subjects.map(
      (subject: Subject | string, index: number) => ({id: (subject as Subject).id || index, name: selector ? subject[selector] : subject})
    );
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
        console.log(this.state)
      }).catch(error => {
      })
    }
    this.setState({
      loading: false,
    });
  }

  handleSubjectSelectChange(id: number) {
    this.setState({
      loading: true,
    });
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
      <Card className="blog-cards__card" key={keyId}>
        <CardContent>
          <header className="blog-cards__blogs-header">{subject.name || subject.id}</header>
          {blogs.map(blog => {
            return (
              <Link to={config.routes.blog.detail(blog.id)} className="blog-cards__blogs-list-element" key={blog.id}>
                <ViewHeadlineIcon fontSize="inherit" />
                <div className="blog-cards__blogs-list-element-text">{blog.title}</div>
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
      <Card className="blog-cards__card--header">
        <CardContent>
          {this.state.loading && <LinearProgress />}
          <SelectWidget data={this.state.subjects} onChange={(id: number) => this.handleSubjectSelectChange(id)}/>
        </CardContent>
      </Card>
    )
  }

  render() {
    return (
      <div className="blog-cards">
        <div className="blog-cards__header">
          {this.renderMainCard()}
        </div>
        <div className="blog-cards__list">
          {this.state.selectedEntity.map((entity: Entity, index: number) => this.renderBlogsCard(index, entity.subject, entity.blogs))}
        </div>

      </div>
    );
  }
};

export default SelectCardList;