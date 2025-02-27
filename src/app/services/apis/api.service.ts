import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpParamsOptions, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

import { ApiResponse } from './type';

export type QueryParams = HttpParamsOptions['fromObject'];

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private extractData<T>(res: HttpResponse<T>) {
    const { url, body } = res;
    if (!body) throw new Error('No response body');
    const resData = body as unknown as ApiResponse<T>;
    if (resData.code !== 0) {
      throw new Error(resData.message);
    }
    return resData.data;
  }

  constructor(private http: HttpClient) { }

  request<T>(method: string, url: string, params?: QueryParams, body?: unknown) {
    return this.http.request<T>(method, url, {
      observe: 'response',
      // withCredentials: true,
      params: new HttpParams({ fromObject: params }),
      body,
    }).pipe(
      map(this.extractData),
      catchError(this.handleError),
    );
  }

  get<T>(url: string, queryParams?: QueryParams) {
    return this.request<T>('GET', url, queryParams);
  }

  post<T>(url: string, body?: unknown, queryParams?: QueryParams) {
    return this.request<T>('POST', url, queryParams, body);
  }

  private handleError(err: Error) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        console.error('Network error: Please check your internet connection.');
        return throwError(
          () =>
            new Error('Network error: Please check your internet connection.'),
        );
      }
      console.error(`HTTP error: ${err.status} ${err.message}`);
      return throwError(
        () => new Error(`HTTP error: ${err.status} ${err.message}`),
      );
    }
    return throwError(() => err);
  }
}
