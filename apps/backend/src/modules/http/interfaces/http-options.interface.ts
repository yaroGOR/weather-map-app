import { Headers } from 'node-fetch';

import { AllowedRequestMethodsType } from '../types/allowed-request-methods.type';

export interface IHttpOptions<T extends Maybe<object> = null> {
  method: AllowedRequestMethodsType;
  url: string;
  body?: T;
  headers?: Headers;
  params?: URLSearchParams;
}
