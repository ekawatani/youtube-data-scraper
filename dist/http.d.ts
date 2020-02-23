import request from 'request';
interface RequestOptions {
    url: string;
    method: 'GET' | 'POST';
    cookieJar: request.CookieJar;
    headers?: request.Headers;
    formData?: {
        [key: string]: string | undefined;
    };
    queries?: Record<string, string>;
}
declare const http: <T>(options: RequestOptions) => Promise<string>;
export default http;
