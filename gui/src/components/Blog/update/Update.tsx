import React, { useEffect, useState } from 'react';

import './Update.scss';

import BlogForm from 'components/Blog/common/BlogForm';
import BlogService from 'shared/services/blog.service';
import { Blog, BlogFormData } from 'shared/interfaces/blog';
import { withRouter } from 'react-router-dom';


interface Props {
  match: any;
}

const service: BlogService = new BlogService();
const initialState = {
  elements: [],
  title: '',
  countries: [],
}

const UpdateForm = (props: Props) => {
  const [blogData, setBlogData] = useState<BlogFormData>(initialState)

  useEffect(() => {
    const { id } = props.match.params;
    getBlog(id);
  }, [])

  const getBlog = (id: number) => {
    service.getBlog(id).then((response: Blog) => {
      if (response) {
        setBlogData({
          elements: service.unformatContent(response.content, response.photo_names),
          title: response.title,
          countries: response.countries
        });
      }
    }).catch(err => {});
  }

  return (
    <div className="blog-update">
      <BlogForm initData={blogData} />
    </div>
  );
};

export default withRouter(UpdateForm);
