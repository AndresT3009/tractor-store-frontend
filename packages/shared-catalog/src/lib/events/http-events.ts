export const HTTP_ERROR_EVENT = 'tractor-store:http-error';

export interface HttpErrorDetail {
  status: number;
  url: string;
  message: string;
}

export type HttpErrorEvent = CustomEvent<HttpErrorDetail>;
