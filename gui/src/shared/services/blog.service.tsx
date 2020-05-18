import { Element, ElementType } from '../interfaces/blog';


class BlogService {
  seperator: string = '/{}/';

  formatContent(elements: Element[]) {
    return elements.map((elem: Element) => elem.value).join(this.seperator)
  }

  unformatContent(content: string) {
    return content.split(this.seperator).map(el => ({value: el, type: ElementType.PARAGRAPH}))
  }
}

export default BlogService;