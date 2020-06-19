import React from 'react';

import './Authors.scss';

import { config  } from 'config';
import { User } from 'shared/interfaces/user';
import SelectCardList from 'components/Blog/common/SelectCardList';


interface Props {
  location: any;
};

interface State {
  authors: User[];
}


class Authors extends React.Component<Props, State> {
  endpoint: string = config.endpoints.blog.authors;
  filters = {user_id: 'id'};
  selector: string = 'username';
  state = {
    authors: []
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      authors: this.props.location.state?.authors || null,
    }
  }

  render() {
    return (
      <SelectCardList endpoint={this.endpoint} selector={this.selector} filters={this.filters} initData={this.state.authors}></SelectCardList>
    );
  }
};

export default Authors;