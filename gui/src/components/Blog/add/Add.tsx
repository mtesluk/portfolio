import React from 'react';
import { connect } from 'react-redux';

import './Add.scss';

import { notifySuccess } from '../../../actions/notify';
import HttpService from '../../../shared/services/HttpService';
import { config } from '../../../config';
import { Blog, Element, ElementType } from '../../../shared/interfaces/blog';
import BlogService from '../../../shared/services/blog.service';


interface State {
  elements: Element[];
  title: string;
  country: string;
}

interface Props {
  notifySuccess: any;
}

class AddForm extends React.Component <Props, State> {
  _httpService: HttpService = new HttpService();
  _service: BlogService = new BlogService();

  state = {
    elements: [{value: '', type: ElementType.PARAGRAPH}],
    title: '',
    country: '',
  };

  addNewParagrapgh(e: any, id: number) {
    this.addElement(ElementType.PARAGRAPH, id);
  }

  addNewImage(e: any, id: number) {
    this.addElement(ElementType.IMAGE, id);
  }

  addElement(type: ElementType, id: number) {
    const array: Element[] = [...this.state.elements];
    array.splice(id+1, 0, {value: '', type: type});
    this.setState({
      elements: [...array]
    });
  }

  removeElement(e: any, id: number) {
    const array: Element[] = [...this.state.elements];
    array.splice(id, 1);
    this.setState({
      elements: [...array]
    });
  }

  getParagraph(v: string, id: number) {
    return (
      <div className="blog-add__paragraph" key={id}>
        <textarea
          key={id}
          id={id.toString()}
          className="blog-add__control blog-add__textarea"
          name={'text-' + id.toString()}
          placeholder=""
          rows={5}
          value={v}
          onChange={(e) => this.onValueChange(e, id)}
        />
      </div>
    )
  }

  onValueChange(e: any, i: number) {
    const array: Element[] = [...this.state.elements];
    array[i].value = e.target.value;
    this.setState({
      elements: array
    })
  }

  getImage() {
    return (
      <input type="file" name="pic" accept="image/*" onChange={(e) => this.onFileChange(e)}/>
    )
  }

  onFileChange(e: any) {
    // console.log(e.target.value)
  }

  renderPartForm(elem: Element, id: number) {
    return (
      <div className="blog-add__part-form" key={id}>
        {elem.type === ElementType.PARAGRAPH ? this.getParagraph(elem.value, id) : this.getImage()}
        {this.toolAction(id)}
      </div>
    )
  }

  toolAction(id: number) {
    let removeButton = <div></ div>;
    const isDeletable = id === 0 && this.state.elements.length > 0;
    if (!isDeletable) {
      removeButton = <button type="button" className="blog-add__remove-p" onClick={(e) => this.removeElement(e, id)}>Remove</button>
    }

    return (
      <div className="blog-add__tool-action">
        <button type="button" className="blog-add__add-p" onClick={(e) => this.addNewParagrapgh(e, id)}>Add here p</button>
        <button type="button" className="blog-add__add-p" onClick={(e) => this.addNewImage(e, id)}>Add here img</button>
        {removeButton}
      </div>
    )
  }

  renderSettings() {
    return (
      <div className="blog-add__settings">
        <input placeholder="Title" onChange={(e) => this.setState({title: e.target.value})} value={this.state.title} />
        <input placeholder="Region" onChange={(e) => this.setState({country: e.target.value})} value={this.state.country} />
      </div>
    )
  }

  clearState() {
    this.setState({
      elements: [{value: '', type: ElementType.PARAGRAPH}],
      title: '',
      country: ''
    })
  }

  onSubmit(event: any) {
    event.preventDefault();
    const formattedContent = this._service.formatContent(this.state.elements);
    const data = {
      content: formattedContent,
      country: this.state.country,
      title: this.state.title,
    };
    this._httpService.post(config.endpoints.blog.base, data).then((response: Blog) => {
      this.clearState();
      this.props.notifySuccess('Blog successfully created. Please wait for administration verification!');
    }).catch(err => {})
  }

  render() {
    return (
      <div className="blog-add">
        <form className="blog-add__form" onSubmit={(e) => this.onSubmit(e)}>
          { this.renderSettings() }
          { this.state.elements.map((elem: Element, id: number) => this.renderPartForm(elem, id)) }
          <button type="submit" className="blog-add__submit">Submit</button>
        </form>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    notifySuccess: (msg: string) => dispatch(notifySuccess(msg))
  };
};

export default connect(null, mapDispatchToProps)(AddForm);
