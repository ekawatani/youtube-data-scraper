import { CookieJar, Headers } from 'request';
import { default as rq }  from 'request-promise-native';

interface RequestOptions {
  url: string;
  method: 'GET' | 'POST';
  cookieJar: CookieJar;
  headers?: Headers;
  formData?: { [key: string]: string | undefined };
  queries?: Record<string, string>;
}

const request = async <T>(options: RequestOptions): Promise<string> => {
  try {
    return await rq({
      uri: options.url,
      method: options.method,
      jar: options.cookieJar,
      headers: {
        'Accept-Language': 'en-US',
        ...options.headers,
      },
      qs: options.queries,
      form: options.formData,
    });
  } catch (e) {
    if (e instanceof Error) {
      e.message = `${options.method} request failed at ${options.url} with options ${JSON.stringify(options)}\n${e.message}`;
    }

    throw e;
  }
};

export default request;