import React from 'react';
import { connect } from 'react-redux';

import { config  } from 'config';
import SelectCardList from 'components/Blog/common/SelectCardList';


interface State {

}

interface Props {
  location: any;
};

class Sites extends React.Component<Props, State> {
  endpoint: string = config.endpoints.blog.countries;
  filters = {country: null};
  state = {
    sites: []
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      sites: this.props.location.state?.countries || null,
    }
  }

  render() {
    return (
      <SelectCardList endpoint={this.endpoint} filters={this.filters}  initData={this.state.sites}></SelectCardList>
    );
  }
};

export default connect()(Sites);
