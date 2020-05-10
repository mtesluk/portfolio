import React from 'react';
import { connect } from 'react-redux';

import { config  } from '../../../config';
import SelectCardList from '../common/SelectCardList';


interface State {

}

interface Props {

};

const Sites = (props: Props) => {
  const endpoint: string = config.endpoints.blog.countries;
  const filters = {country: null};

  return (
    <SelectCardList endpoint={endpoint} filters={filters}></SelectCardList>
  );
};

export default connect()(Sites);
