import React from 'react';

import './Authors.scss';

import { config  } from '../../../config';
import SelectCardList from '../common/SelectCardList';


interface Props {

};

interface State {

}


const  Authors = (props: Props) => {
  const endpoint: string = config.endpoints.blog.authors;
  const filters = {user_id: 'id'};
  const selector: string = 'username';

  return (
    <SelectCardList endpoint={endpoint} selector={selector} filters={filters}></SelectCardList>
  );
};

export default Authors;