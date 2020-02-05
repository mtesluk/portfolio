import React from "react";
import './Add.scss';


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

  addNewP(e: any, id: number) {
    this.addElem('paragraph', id);
  }

  addNewI(e: any, id: number) {
    this.addElem('image', id);
  }

  addElem(type: 'paragraph' | 'image', id: number) {
    const array: Element[] = [...this.state.elements];
    array.splice(id+1, 0, {value: '', type: type});
    this.setState({
      elements: [...array]
    });
    console.log(array)
  }

  remove(e: any, id: number) {
    const array: Element[] = [...this.state.elements];
    array.splice(id, 1);
    this.setState({
      elements: [...array]
    });
  }

  paragraph(v: string, id: number) {
    return (
      <div className="form__paragraph" key={id}>
        <textarea
          key={id}
          id={id.toString()}
          className="form__control"
          name={'text-' + id.toString()}
          placeholder=""
          rows={5}
          value={v}
          onChange={(e) => this.handleValueChange(e, id)}
        />
      </div>
    )
  }

  handleValueChange(e: any, i: number) {
    const array: Element[] = [...this.state.elements];
    array[i].value = e.target.value;
    this.setState({
      elements: array
    })
  }

  img() {
    return (
      <input type="file" name="pic" accept="image/*" onChange={(e) => this.onFileChange(e)}/>
    )
  }

  onFileChange(e: any) {
    console.log(e.target.value)
  }

  toolAction(id: number) {
    let removeButton = <div></ div>;
    const isDeletable = id === 0 && this.state.elements.length > 0;
    if (!isDeletable) {
      removeButton = <button type="button" className="form__remove-p" onClick={(e) => this.remove(e, id)}>Remove</button>
    }

    return (
      <div className="form__tool-action">
        <button type="button" className="form__add-p" onClick={(e) => this.addNewP(e, id)}>Add here p</button>
        <button type="button" className="form__add-p" onClick={(e) => this.addNewI(e, id)}>Add here img</button>
        {removeButton}
      </div>
    )
  }

  part(elem: Element, id: number) {

    return (
      <div className="form__part-form" key={id}>
        {elem.type === 'paragraph' ? this.paragraph(elem.value, id) : this.img()}
        {this.toolAction(id)}
      </div>
    )
  }

  handleSubmit(event: any) {
    // event.preventDefault();
    // axios.post(config.endpoints.postNewBLog, this.state.elements).then(response => {
    //   console.log(response)
    // }).catch(error => {
    //   console.log(error)
    // })
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          {
            this.state.elements.map((elem, id) => this.part(elem, id))
          }
          <button type="submit" className="form__submit">Submit</button>
        </form>
      </div>
    );
  }
};