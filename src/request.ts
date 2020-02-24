import got, { Headers } from 'got';
import { CookieJar } from 'tough-cookie';

interface RequestOptions {
  method: 'GET' | 'POST';
  cookieJar: CookieJar;
  headers?: Headers;
  formData?: { [key: string]: string | undefined };
  queries?: Record<string, string>;
}

const request = async (url: string, options: RequestOptions): Promise<string> => {
  try {
    const response = await got(url, {
      method: options.method,
      cookieJar: options.cookieJar,
      headers: options.headers,
      searchParams: options.queries,
      form: options.formData,
    });

    return response.body;
  } catch (e) {
    if (e instanceof Error) {
      e.message = `${options.method} request failed at ${url} with options ${JSON.stringify(options)}\n${e.message}`;
    }

    throw e;
  }
};

export default request;