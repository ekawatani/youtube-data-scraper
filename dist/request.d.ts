import { CookieJar, Headers } from 'request';
interface RequestOptions {
    url: string;
    method: 'GET' | 'POST';
    cookieJar: CookieJar;
    headers?: Headers;
    formData?: {
        [key: string]: string | undefined;
    };
    queries?: Record<string, string>;
}
declare const request: <T>(options: RequestOptions) => Promise<string>;
export default request;
