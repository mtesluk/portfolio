import { Element, ElementType, Blog } from '../interfaces/blog';
import HttpService from './HttpService';
import { config } from '../../config';


class BlogService {
  _httpService: HttpService = new HttpService();
  seperator: string = '/{}/';

  formatContent(elements: Element[]) {
    return elements.map((elem: Element) => elem.value).join(this.seperator)
  }

  unformatContent(content: string) {
    return content.split(this.seperator).map(el => ({value: el, type: ElementType.PARAGRAPH}))
  }

  removeBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    return this._httpService.delete(url).then(response => response);
  }

  getBlog(id: number) {
    const url = `${config.endpoints.blog.base}${id}/`;
    return this._httpService.get(url).then((response: Blog) => response);
  }

  postBlog(rawData: {elements: Element[], country: string, title: string}) {
    const formattedContent = this.formatContent(rawData.elements);
    const data = {
      content: formattedContent,
      country: rawData.country,
      title: rawData.title,
    };
    const url = config.endpoints.blog.base;
    return this._httpService.post(url, data).then((response: Blog) => response);
  }
}

export default BlogService;