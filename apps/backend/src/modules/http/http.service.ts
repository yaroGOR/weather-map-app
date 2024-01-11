import { HttpException, Injectable } from '@nestjs/common';
import fetch, { Headers, Response } from 'node-fetch';

import { IHttpOptions } from './interfaces/http-options.interface';

@Injectable()
export class HttpService {
  private static parseError(possibleError: unknown): IError {
    const message = 'Something went wrong';

    if (possibleError && typeof possibleError === 'object') {
      const { message: coercedMessage } = Object.assign(
        {
          message,
        },
        possibleError,
      );

      return {
        message: coercedMessage,
      };
    }

    return {
      message,
    };
  }

  public async request<T = undefined, V extends Maybe<object> = null>(
    options: IHttpOptions<V>,
  ): Promise<T> {
    const { method, url, body, headers, params } = options;

    const endpoint = `${url}${params ? `?${params.toString()}` : ''}`;

    const refinedHeaders = headers || new Headers();

    if (method === 'POST') {
      refinedHeaders.append('Content-Type', 'application/json');
    }

    const result = await fetch(endpoint, {
      method,
      body: body && JSON.stringify(body),
      headers: refinedHeaders,
    });

    const isJson = !!result.headers
      .get('content-type')
      ?.includes('application/json');

    const responseCode = result.status;

    const success: boolean =
      !!responseCode && /^[123]\d{2}$/.test(responseCode.toString());

    const response = isJson ? await result.json() : await result.text();

    if (!success) {
      const parsedError = HttpService.parseError(response);

      throw new HttpException(parsedError, responseCode);
    }

    return response;
  }

  public async fetchStream(url: string): Promise<Maybe<Response>> {
    try {
      const response = await fetch(url);

      const success: boolean =
        !!response.status && /^[123]\d{2}$/.test(response.status.toString());

      if (!response.body || !success) {
        return null;
      }

      return response;
    } catch (e) {
      return null;
    }
  }
}
