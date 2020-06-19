import React from 'react';

import './Add.scss';

import BlogForm from 'components/Blog/common/BlogForm';


interface Props {

}

const AddForm = (props: Props) => {
  return (
    <div className="blog-add">
      <BlogForm />
    </div>
  );
};

export default AddForm;
