import React from "react";
import './Add.scss';
import { NotificationService } from '../../shared/services/Notification';


interface Props {}
interface State {
  elements: Element[];
}

interface Element {
  value: string,
  type: 'paragraph' | 'image'
}

export class AddForm extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      elements: [{value: '', type: 'paragraph'}]
    }
  }

  addNewParagrapgh(e: any, id: number) {
    this.addElement('paragraph', id);
  }

  addNewImage(e: any, id: number) {
    this.addElement('image', id);
  }

  addElement(type: 'paragraph' | 'image', id: number) {
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
      <div className="form__paragraph" key={id}>
        <textarea
          key={id}
          id={id.toString()}
          className="form__control form__textarea"
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
    console.log(e.target.value)
  }

  getPartForm(elem: Element, id: number) {
    return (
      <div className="form__part-form" key={id}>
        {elem.type === 'paragraph' ? this.getParagraph(elem.value, id) : this.getImage()}
        {this.toolAction(id)}
      </div>
    )
  }

  toolAction(id: number) {
    let removeButton = <div></ div>;
    const isDeletable = id === 0 && this.state.elements.length > 0;
    if (!isDeletable) {
      removeButton = <button type="button" className="form__remove-p" onClick={(e) => this.removeElement(e, id)}>Remove</button>
    }

    return (
      <div className="form__tool-action">
        <button type="button" className="form__add-p" onClick={(e) => this.addNewParagrapgh(e, id)}>Add here p</button>
        <button type="button" className="form__add-p" onClick={(e) => this.addNewImage(e, id)}>Add here img</button>
        {removeButton}
      </div>
    )
  }

  setSettings() {

    return (
      <div className="form__settings">
        <input placeholder="Name" />
        <input placeholder="Latitude" />
        <input placeholder="Length" />
      </div>
    )
  }

  onSubmit(event: any) {
    event.preventDefault();
    // const notification: NotificationService = new NotificationService();
    // notification.createNotification('ad', 'info')
    // axios.post(config.endpoints.postNewBLog, this.state.elements).then(response => {
    //   console.log(response)
    // }).catch(error => {
    //   console.log(error)
    // })
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={(e) => this.onSubmit(e)}>
          { this.setSettings() }
          { this.state.elements.map((elem, id) => this.getPartForm(elem, id)) }
          <button type="submit" className="form__submit">Submit</button>
        </form>
      </div>
    );
  }
};