import { Headers } from 'got';
import { CookieJar } from 'tough-cookie';
interface RequestOptions {
    method: 'GET' | 'POST';
    cookieJar: CookieJar;
    headers?: Headers;
    formData?: {
        [key: string]: string | undefined;
    };
    queries?: Record<string, string>;
}
declare const request: <T>(url: string, options: RequestOptions) => Promise<string>;
export default request;
