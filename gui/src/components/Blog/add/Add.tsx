import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './Add.scss';
import ButtonWidget from 'shared/components/widgets/button/button';
import SelectWidget from 'shared/components/widgets/select/select';
import SelectFileWidget from 'shared/components/widgets/selectFile/selectFile';

import { notifySuccess } from 'actions/notify';
import { Blog, Element, ElementType } from 'shared/interfaces/blog';
import { config } from 'config';
import BlogService from 'shared/services/blog.service';


interface ComponentState {
  elements: Element[];
  title: string;
  country: string;
}

interface Props {
  notifySuccess: (msg: string) => void;
  history: any;
}

class AddForm extends React.Component <Props, ComponentState> {
  _service: BlogService = new BlogService();

  state = {
    elements: [{value: '', type: ElementType.PARAGRAPH}],
    title: '',
    country: '',
  };

  clearState() {
    this.setState({
      elements: [{value: '', type: ElementType.PARAGRAPH}],
      title: '',
      country: ''
    });
  }

  addNewParagraph(e: any, id: number) {
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

  onParagraphValueChange(e: any, i: number) {
    const array: Element[] = [...this.state.elements];
    array[i].value = e.target.value;
    this.setState({
      elements: array
    });
  }

  onFileChange(file: File, i: number) {
    const array: Element[] = [...this.state.elements];
    array[i].value = file;
    this.setState({
      elements: array
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const data = {
      elements: this.state.elements,
      country: this.state.country,
      title: this.state.title,
    };
    this._service.postBlog(data).then((response: Blog) => {
      this.clearState();
      this.props.notifySuccess('Blog successfully created. Please wait for administration verification!');
      this.props.history.push('/blog/' + response.id);
    }).catch(err => {});
  }

  renderSelectImage(file: File, i: number) {
    return (
      <SelectFileWidget name="blog-image" onChange={(file) => this.onFileChange(file, i)} orderNumber={i}/>
    )
  }

  renderParagraph(value: string, id: number) {
    return (
      <div className="blog-add__paragraph" key={id}>
        <textarea
          className="blog-add__control blog-add__textarea"
          placeholder="Type..."
          rows={5}
          value={value}
          onChange={(e) => this.onParagraphValueChange(e, id)}
        />
      </div>
    )
  }

  renderPartForm(elem: Element, id: number) {
    return (
      <div className="blog-add__part-form" key={id}>
        {elem.type === ElementType.PARAGRAPH ? this.renderParagraph(elem.value as string, id) : this.renderSelectImage(elem.value as File, id)}
        {this.renderToolAction(id)}
      </div>
    )
  }

  renderToolAction(id: number) {
    let removeButton = <div></ div>;
    const isDeletable = id === 0 && this.state.elements.length > 0;
    if (!isDeletable) {
      removeButton = <button type="button" className="blog-add__remove-p" onClick={(e) => this.removeElement(e, id)}>Remove</button>
    }

    return (
      <div className="blog-add__tool-action">
        <button type="button" className="blog-add__add-p" onClick={(e) => this.addNewParagraph(e, id)}>Add here paragrapgh</button>
        <button type="button" className="blog-add__add-p" onClick={(e) => this.addNewImage(e, id)}>Add here image</button>
        {removeButton}
      </div>
    )
  }

  renderSettings() {
    return (
      <div className="blog-add__settings">
        <input placeholder="Title" onChange={(e) => this.setState({title: e.target.value})} value={this.state.title} />
        <SelectWidget placeholder="Region" changeValue={true} onChange={(value) => this.setState({country: value.toString()})} endpoint={config.endpoints.countries.base}/>
      </div>
    )
  }

  render() {
    return (
      <div className="blog-add">
        <form className="blog-add__form" onSubmit={(e) => this.onSubmit(e)}>
          { this.renderSettings() }
          { this.state.elements.map((elem: Element, id: number) => this.renderPartForm(elem, id)) }
          <ButtonWidget type="submit" text={'Submit'}/>
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

export default withRouter(connect(null, mapDispatchToProps)(AddForm));
