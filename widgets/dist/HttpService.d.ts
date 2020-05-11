interface Filters {
    [name: string]: string | number;
}
declare class HttpService {
    get(url: string, filters?: Filters): Promise<any>;
}
export default HttpService;
