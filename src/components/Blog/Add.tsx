import React from "react";
import './Add.scss';


interface Props {}
interface State {
  values: string[];
}

export class AddForm extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      values: ["1", "2", "3"]
    }
  }
  // const [values, setValues] = useState<string[]>(['']);

  addNewP(e: any, id: number) {
    const array: string[] = [...this.state.values];
    array.splice(id+1, 0, '');
    this.setState({
      values: [...array]
    });
    this.forceUpdate();
    console.log(array)
  }

  addNewI(e: any, id: number) {
    const array: string[] = [...this.state.values];
    array.splice(id+1, 0, '');
    this.setState({
      values: [...array]
    });
    console.log(array)
  }

  remove(e: any) {
    ;
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
          onChange={(e) => this.s(e, id)}
        />
      </div>
    )
  }

  s(e: any, i: number) {
    const array: string[] = [...this.state.values];
    array[i] = e.target.value;
    this.setState({
      values: array
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
    const isDeletable = id === 0 && this.state.values.length > 0;
    if (!isDeletable) {
      removeButton = <button type="button" className="form__remove-p" onClick={(e) => this.remove(e)}>Remove</button>
    }

    return (
      <div className="form__tool-action">
        <button type="button" className="form__add-p" onClick={(e) => this.addNewP(e, id)}>Add here p</button>
        <button type="button" className="form__add-p" onClick={(e) => this.addNewI(e, id)}>Add here img</button>
        {removeButton}
      </div>
    )
  }

  part(val: string, id: number) {
    console.log('[VALUE]', val, 'id', id);
    return (
      <div className="form__part-form" key={id}>
        {this.paragraph(val, id)}
        {this.toolAction(id)}
      </div>
    )
  }

  handleSubmit(event: any) {
    event.preventDefault();
  }

  handleChange(event: any) {
    const _tempValues: any = [...this.state.values];
    _tempValues[event.target.id] = event.target.value;

    this.setState({
      values: _tempValues
    });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          {
            this.state.values.map((val, id) => this.part(val, id))
          }
          <button type="submit" className="form__submit">Submit</button>
        </form>
      </div>
    );
  }
};