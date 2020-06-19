import { Element, ElementType, Blog, BlogFormData } from 'shared/interfaces/blog';
import { config } from 'config';
import HttpService from './HttpService';


class BlogService {
  _httpService: HttpService = new HttpService();
  seperator: string = '/{}/';
  separatorHelper: string = '//{()}\\';

  formatContent(elements: Element[]) {
    return elements.map((elem: Element) => (elem.type === 0 ? elem.value : this.seperator)).join('');
  }

  unformatContent(contentStr: string, filenamesStr: string | null) {
    const content: Element[] = [];
    const filenames = (filenamesStr && filenamesStr.split(',')) || [];
    filenames.forEach(filename => {
      contentStr = contentStr.replace(this.seperator, this.separatorHelper);
      const tmpContent = contentStr.split(this.separatorHelper);
      contentStr = tmpContent[1];
      if (tmpContent[0]) content.push({value: tmpContent[0], type: ElementType.PARAGRAPH});
      content.push({value: filename, type: ElementType.IMAGE});
    });
    if (contentStr) content.push({value: contentStr, type: ElementType.PARAGRAPH});
    return content;
  }

  removeBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    return this._httpService.delete(url).then(response => response);
  }

  getBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    return this._httpService.get(url).then(response => ({...response, countries: response.countries.split(';')}));
  }

  putBlog(id: number, rawData: BlogFormData) {
    const data = this._formatBlogDataToSend(rawData);
    const url = `${config.endpoints.blog.base}${id}/`;
    return this._httpService.put(url, data).then((response: Blog) => response);
  }

  activateBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    const data = {is_active: true};
    return this._httpService.put(url, data).then((response: Blog) => response);
  }

  getActivatedBlogs(params: {} = {}) {
    const url = config.endpoints.blog.base;
    const newParams = {...params, is_active: true};
    return this._httpService.get(url, newParams).then((response: Blog[]) => response);
  }

  getBlogs(params: {} = {}) {
    const url = config.endpoints.blog.base;
    return this._httpService.get(url, params).then((response: Blog[]) => response);
  }

  postBlog(rawData: BlogFormData) {
    const data = this._formatBlogDataToSend(rawData);
    const url = config.endpoints.blog.base;
    return this._httpService.post(url, data, {headers: {'Content-Type': 'multipart/form-data'}}).then((response: Blog) => response);
  }

  _formatBlogDataToSend(rawData: BlogFormData) {
    const data = new FormData();
    const images = rawData.elements.filter(el => el.type === 1).map(el => el.value);
    images.forEach(el => {
      data.append('file', el)
    })
    const formattedContent = this.formatContent(rawData.elements);
    data.set('content', formattedContent);
    data.set('countries', rawData.countries.join(';'));
    data.set('title', rawData.title);
    return data;
  }
}

export default BlogService;